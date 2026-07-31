import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../../lib/turtle-ui/components/button/Button";

export const PublishSuccessModal = ({
  editingId,
  title,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border-2 border-[#6C141E] shadow-2xl relative">
        <div className="w-16 h-16 bg-[#6C141E]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl animate-bounce">
          🎉
        </div>
        <h3 className="text-2xl font-black text-neutral-900 mb-2">
          {editingId ? "Article Updated!" : "Article Published Live!"}
        </h3>
        <p className="text-sm text-neutral-600 mb-6">
          Your article <strong className="text-black">"{title}"</strong> has been
          successfully {editingId ? "updated on" : "broadcast to"} the Flowbee blog
          grid.
        </p>
        <div className="space-y-3">
          <Link to="/" className="block w-full">
            <Button className="w-full !bg-[#6C141E] hover:!bg-[#8B1A27] !text-white !font-extrabold !py-3 !rounded-xl shadow-[3px_3px_0px_0px_#4A0D14]">
              🌐 View Live on Homepage
            </Button>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs font-bold text-neutral-600 hover:text-black hover:bg-gray-100 rounded-xl transition-all"
          >
            + Write Another Article
          </button>
        </div>
      </div>
    </div>
  );
};
