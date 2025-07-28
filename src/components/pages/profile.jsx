import React from "react";
import Layout from "../layout/Layout";
import RightSideProfile from "../profile/rightSideProfile";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <RightSideProfile id={id} />
      </div>
    </Layout>
  );
}
