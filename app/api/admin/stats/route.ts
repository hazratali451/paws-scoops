import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import connectDB from "@/lib/db";
import Lead from "@/lib/models/Lead";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    const [
      total,
      statusCounts,
      thisWeek,
      thisMonth,
      lastMonth,
      referralCounts,
      recentLeads,
      monthlyTrend,
    ] = await Promise.all([
      Lead.countDocuments(),

      Lead.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),

      Lead.countDocuments({ createdAt: { $gte: startOfWeek } }),

      Lead.countDocuments({ createdAt: { $gte: startOfMonth } }),

      Lead.countDocuments({
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
      }),

      Lead.aggregate([
        { $group: { _id: "$hearFrom", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),

      Lead.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name status createdAt frequency")
        .lean(),

      Lead.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 6 },
      ]),
    ]);

    const statusMap: Record<string, number> = {};
    for (const s of statusCounts) {
      statusMap[s._id] = s.count;
    }

    const won = statusMap["Won"] || 0;
    const conversionRate = total > 0 ? ((won / total) * 100).toFixed(1) : "0";

    const monthGrowth =
      lastMonth > 0
        ? (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(0)
        : thisMonth > 0
          ? "+100"
          : "0";

    const hearFromLabels: Record<string, string> = {
      fb: "Facebook",
      google: "Google",
      ys: "Yard Sign",
      sticker: "Sticker",
    };

    const referrals = referralCounts
      .filter((r) => r._id)
      .map((r) => ({
        source: hearFromLabels[r._id] || r._id,
        count: r.count,
      }));

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const trend = monthlyTrend
      .reverse()
      .map((m) => ({
        label: `${months[m._id.month - 1]} ${m._id.year}`,
        count: m.count,
      }));

    return NextResponse.json({
      total,
      statusCounts: statusMap,
      thisWeek,
      thisMonth,
      lastMonth,
      monthGrowth: Number(monthGrowth),
      conversionRate: Number(conversionRate),
      referrals,
      recentLeads,
      trend,
    });
  } catch (error) {
    console.error("Stats failed:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
