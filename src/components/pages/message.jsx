import React from "react";
import Layout from "../layout/Layout";
import MiddleSideMess from "../message/middleSideMess";
import RightSideMess from "../message/RightSideMess";
import { useParams } from "react-router-dom";

export default function Message() {
  const { id, idfr } = useParams();

  return (
    <Layout className="p-0">
      <div className="flex h-screen overflow-hidden bg-white">
        {/* Message List */}
        <div className="w-[380px] min-w-[380px] flex-shrink-0">
          <MiddleSideMess id={id} />
        </div>

        {/* Chat Area */}
        <div className="flex-1 min-w-0 flex flex-col">
          <RightSideMess id={id} idfr={idfr} />
        </div>
      </div>
    </Layout>
  );
}
