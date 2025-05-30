
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Search, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";

const MemberDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock member data - will be replaced with Supabase queries
  const members = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      role: "President",
      joinDate: "2018-03-15",
      status: "Active",
      city: "Duluth",
      avatar: null,
      isPublic: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 234-5678",
      role: "Vice President",
      joinDate: "2019-01-20",
      status: "Active",
      city: "Duluth",
      avatar: null,
      isPublic: true
    },
    {
      id: 3,
      name: "Michael Davis",
      email: "m.davis@email.com",
      phone: null,
      role: "Treasurer",
      joinDate: "2020-06-10",
      status: "Active",
      city: "Norcross",
      avatar: null,
      isPublic: false
    },
    {
      id: 4,
      name: "Emily Wilson",
      email: "emily.wilson@email.com",
      phone: "(555) 345-6789",
      role: "Secretary",
      joinDate: "2021-02-14",
      status: "Active",
      city: "Duluth",
      avatar: null,
      isPublic: true
    },
    {
      id: 5,
      name: "Robert Brown",
      email: null,
      phone: "(555) 456-7890",
      role: "Member",
      joinDate: "2022-09-05",
      status: "Active",
      city: "Suwanee",
      avatar: null,
      isPublic: false
    }
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleBadgeVariant = (role: string) => {
    if (role.includes("President")) return "default";
    if (role.includes("Treasurer") || role.includes("Secretary")) return "secondary";
    return "outline";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Member Directory
          </CardTitle>
          <CardDescription>
            Connect with fellow Civitan members (privacy settings respected)
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Privacy Notice */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
            <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">Privacy Notice</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Only members who have opted to share their contact information publicly will appear in this directory. 
                Personal information is protected according to our privacy policy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search members by name, role, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Member List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar || undefined} />
                  <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <Badge variant={getRoleBadgeVariant(member.role)} className="text-xs">
                    {member.role}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {member.isPublic && member.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <a 
                      href={`mailto:${member.email}`}
                      className="hover:text-civitan-blue transition-colors"
                    >
                      {member.email}
                    </a>
                  </div>
                )}

                {member.isPublic && member.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <a 
                      href={`tel:${member.phone}`}
                      className="hover:text-civitan-blue transition-colors"
                    >
                      {member.phone}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{member.city}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {new Date(member.joinDate).getFullYear()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {member.status}
                  </Badge>
                </div>
              </div>

              {!member.isPublic && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 text-center">
                    Contact information private
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No members found matching your search.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Member Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Directory Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-civitan-blue">{members.length}</div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-civitan-gold">
                {members.filter(m => m.isPublic).length}
              </div>
              <div className="text-sm text-gray-600">Public Profiles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {members.filter(m => m.status === "Active").length}
              </div>
              <div className="text-sm text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {members.filter(m => m.role !== "Member").length}
              </div>
              <div className="text-sm text-gray-600">Board Members</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberDirectory;
