"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockTickets, Ticket } from "@/data/mockData";
import SeverityBadge from "@/components/SeverityBadge";
import CategoryBadge from "@/components/CategoryBadge";
import { Search, Filter, User, MapPin, Calendar, Hash, MessageSquare, Brain } from "lucide-react";

const Tickets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const filteredTickets = useMemo(() => {
    return mockTickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || ticket.category === categoryFilter;
      const matchesSeverity =
        severityFilter === "all" || ticket.severity === severityFilter;

      return matchesSearch && matchesCategory && matchesSeverity;
    });
  }, [searchTerm, categoryFilter, severityFilter]);

  const totalPages = Math.ceil(filteredTickets.length / pageSize);

  const pagedTickets = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTickets.slice(start, start + pageSize);
  }, [filteredTickets, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, severityFilter, pageSize]);

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "😊";
      case "Negative":
        return "😟";
      case "Neutral":
        return "😐";
      default:
        return "🤔";
    }
  };

  const visiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Support Tickets
          </h1>
          <p className="text-muted-foreground">
            Manage and track customer support requests
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search tickets by title, name, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Network & Communication">Network & Communication</SelectItem>
                    <SelectItem value="Billing & Recharge">Billing & Recharge</SelectItem>
                    <SelectItem value="Plans & Services">Plans & Services</SelectItem>
                    <SelectItem value="Profile & Security">Profile & Security</SelectItem>
                    <SelectItem value="General Complaints">General Complaints</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Needs Attention">Needs Attention</SelectItem>
                    <SelectItem value="Fixed">Fixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTickets.length === 0 ? "0" : `${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, filteredTickets.length)}`} of {filteredTickets.length} tickets
              </p>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Rows per page:</span>
                <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
                  <SelectTrigger className="w-[80px] h-8 px-2 text-sm">
                    <SelectValue placeholder="15" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pagedTickets.map((ticket) => (
            <Card key={ticket.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 shadow-card hover:-translate-y-1" onClick={() => setSelectedTicket(ticket)}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg line-clamp-2 flex-1">{ticket.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs mt-1 shrink-0 font-mono">{ticket.id}</Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <User className="h-3 w-3" />
                  {ticket.customerName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{ticket.customerMessage}</p>
                  <div className="flex flex-wrap gap-2">
                    <CategoryBadge category={ticket.category} />
                    <SeverityBadge severity={ticket.severity} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{getSentimentIcon(ticket.sentiment)}</span>
                      {ticket.sentiment}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {filteredTickets.length > pageSize && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>

            {startPage > 1 && (
              <>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)}>1</Button>
                {startPage > 2 && <span className="text-sm text-muted-foreground">...</span>}
              </>
            )}

            {pageNumbers.map((page) => (
              <Button key={page} size="sm" variant={page === currentPage ? "default" : "outline"} onClick={() => setCurrentPage(page)}>{page}</Button>
            ))}

            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && <span className="text-sm text-muted-foreground">...</span>}
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(totalPages)}>{totalPages}</Button>
              </>
            )}

            <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
          </div>
        )}

        {/* Empty State */}
        {filteredTickets.length === 0 && (
          <Card className="shadow-card mt-8">
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No tickets found</h3>
                <p>Try adjusting your search criteria or filters</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ticket Dialog */}
        <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedTicket && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-start justify-between">
                    <span className="text-xl">{selectedTicket.title}</span>
                    <Badge variant="secondary" className="mt-[6px] mr-5">{selectedTicket.id}</Badge>
                  </DialogTitle>
                  <DialogDescription>
                    Full ticket details and customer information
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <User className="h-4 w-4" /> Customer Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Name:</span> {selectedTicket.customerName}</p>
                        <p><span className="font-medium">IP Address:</span> {selectedTicket.ipAddress}</p>
                        <p className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="font-medium">Location:</span> {selectedTicket.location}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Hash className="h-4 w-4" /> Ticket Details
                      </h4>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <CategoryBadge category={selectedTicket.category} />
                          <SeverityBadge severity={selectedTicket.severity} />
                        </div>
                        <p className="text-sm"><span className="font-medium">Created:</span> {new Date(selectedTicket.createdAt).toLocaleString()}</p>
                        <p className="text-sm"><span className="font-medium">Updated:</span> {new Date(selectedTicket.updatedAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" /> Customer Message
                    </h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm leading-relaxed">{selectedTicket.customerMessage}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Brain className="h-4 w-4" /> AI Sentiment Analysis
                    </h4>
                    <div className="bg-gradient-primary p-4 rounded-lg text-primary-foreground">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{getSentimentIcon(selectedTicket.sentiment)}</span>
                        <span className="font-medium">Sentiment: {selectedTicket.sentiment}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedTicket.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Tickets;