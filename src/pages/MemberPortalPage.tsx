
import React from "react";
import { useNavigate } from "react-router-dom";
import MemberPortal from "@/components/member/MemberPortal";
import { useAuth } from "@/hooks/useAuth";

const MemberPortalPage = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MemberPortal onLogout={handleLogout} />
    </div>
  );
};

export default MemberPortalPage;
