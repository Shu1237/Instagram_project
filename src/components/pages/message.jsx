import React from "react";
import Layout from "../layout/Layout";
import MiddleSideMess from "../message/middleSideMess";
import RightSideMess from "../message/RightSideMess";
import { useParams } from "react-router-dom";

export default function Message() {
  const { id, idfr } = useParams();

  return (
    <Layout className="p-0">
      <div className="flex h-screen">
        {/* Message List */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700">
          <MiddleSideMess id={id} />
        </div>

        {/* Chat Area */}
        <div className="flex-1">
          <RightSideMess id={id} idfr={idfr} />
        </div>
      </div>
    </Layout>
  );
}
