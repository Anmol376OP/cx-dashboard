"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Button } from "@/components/ui/button";
import { sentimentData, categoryData, ticketVolumeData, aiInsights } from "@/data/mockData";
import { TrendingUp, TrendingDown, Users, AlertCircle, Brain, Lightbulb } from "lucide-react";

const Home = () => {
  const [timePeriod, setTimePeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Customer Experience Dashboard</h1>
          <p className="text-muted-foreground">Real-time insights into customer sentiment and support metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">312</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-success">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -12% from last week
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2h</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-success">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -0.8h from last week
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.6/5</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-success">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.3 from last week
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
              <AlertCircle className="h-4 w-4 text-critical" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-critical">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2 from yesterday
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Trends */}
          <Card className="shadow-chart">
            <CardHeader>
              <CardTitle>Live Sentiment Trends</CardTitle>
              <CardDescription>Sentiment probability values per day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sentimentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[0, 1]}
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }}
                    formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, ""]}
                  />
                  <Line
                    type="monotone"
                    dataKey="positive"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
                    name="Positive"
                  />
                  <Line
                    type="monotone"
                    dataKey="neutral"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
                    name="Neutral"
                  />
                  <Line
                    type="monotone"
                    dataKey="negative"
                    stroke="hsl(var(--chart-4))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 4 }}
                    name="Negative"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Issue Categories */}
          <Card className="shadow-chart">
            <CardHeader>
              <CardTitle>Issue Category Distribution</CardTitle>
              <CardDescription>Breakdown of tickets by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    innerRadius={40}
                    dataKey="count"
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                      const safeMidAngle = typeof midAngle === "number" ? midAngle : 0;
                      const safeIndex = typeof index === "number" ? index : 0;
                      const x = cx + radius * Math.cos(-safeMidAngle * RADIAN);
                      const y = cy + radius * Math.sin(-safeMidAngle * RADIAN);

                      const category = categoryData[safeIndex]?.category ?? "";
                      const percentText = `${((percent ?? 0) * 100).toFixed(0)}%`;
                      const labelText = `${category} ${percentText}`;

                      return (
                        <text
                          x={x}
                          y={y}
                          fill={(() => {
                            const colors = [
                              "hsl(var(--chart-1))",
                              "hsl(var(--chart-2))",
                              "hsl(var(--chart-3))",
                              "hsl(var(--chart-4))",
                              "hsl(var(--chart-5))",
                              "hsl(var(--primary))"
                            ];
                            return colors[(typeof index === "number" ? index : 0) % colors.length];
                          })()}

                          textAnchor={x > cx ? "start" : "end"}
                          dominantBaseline="central"
                          fontSize="12"
                          className=""
                        >
                          {labelText}
                        </text>
                      );
                    }}
                  >
                    {categoryData.map((entry, index) => {
                      const colors = [
                        "hsl(var(--chart-1))",
                        "hsl(var(--chart-2))",
                        "hsl(var(--chart-3))",
                        "hsl(var(--chart-4))",
                        "hsl(var(--chart-5))",
                        "hsl(var(--primary))"
                      ];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                    }}
                    formatter={(value: number, name: string) => [value, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </div>

        {/* Ticket Volume Chart */}
        <Card className="shadow-chart">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Total Ticket Volume Over Time</CardTitle>
                <CardDescription>Ticket volume trends by time period</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={timePeriod === 'daily' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimePeriod('daily')}
                >
                  Daily
                </Button>
                <Button
                  variant={timePeriod === 'weekly' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimePeriod('weekly')}
                >
                  Weekly
                </Button>
                <Button
                  variant={timePeriod === 'monthly' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimePeriod('monthly')}
                >
                  Monthly
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketVolumeData[timePeriod]}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Bar
                  dataKey="tickets"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insights Section */}
        <Card className="shadow-card bg-gradient-primary border-primary">
          <CardHeader>
            <CardTitle className="text-primary-foreground flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Insights
            </CardTitle>
            <CardDescription className="text-primary-foreground/80">
              AI-powered analysis of customer sentiment and support patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="text-primary-foreground">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Overall Sentiment: {aiInsights.overallSentiment}
                </h4>
                <p className="text-sm text-primary-foreground/90 mb-4">
                  Customer sentiment score: <span className="font-bold">{aiInsights.sentimentScore}%</span>
                </p>

                <h4 className="font-semibold mb-2">Key Trends</h4>
                <p className="text-sm text-primary-foreground/90">
                  {aiInsights.trends}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Top Issues
                </h4>
                <ul className="text-sm text-primary-foreground/90 mb-4 space-y-1">
                  {aiInsights.topIssues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary-foreground/60">•</span>
                      {issue}
                    </li>
                  ))}
                </ul>

                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Recommendations
                </h4>
                <p className="text-sm text-primary-foreground/90">
                  {aiInsights.recommendations}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;