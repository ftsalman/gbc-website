import React, { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { InputBox } from "../../../../../lib/turtle-ui/components/input-box/InputBox";
import { Button } from "../../../../../lib/turtle-ui/components/button/Button";
import { BLOG_CATEGORIES } from "../constants/blogData";

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop",
];

const BlockEmbed = Quill.import("blots/block/embed");

class UploadedVideoBlot extends BlockEmbed {
  static blotName = "uploadedVideo";
  static tagName = "video";

  static create(value) {
    const node = super.create();
    node.setAttribute("src", value);
    node.setAttribute("controls", "");
    node.setAttribute("preload", "metadata");
    node.setAttribute("playsinline", "");
    node.setAttribute("class", "w-full rounded-xl my-4");
    return node;
  }

  static value(node) {
    return node.getAttribute("src");
  }
}

Quill.register(UploadedVideoBlot);

import { ImageUploader } from "./ImageUploader";
import { VideoUploader } from "./VideoUploader";
import { uploadToCloudinary } from "../utils/cloudinary";

export const BlogEditorForm = ({
  title,
  setTitle,
  excerpt,
  setExcerpt,
  content,
  setContent,
  category,
  setCategory,
  readTime,
  setReadTime,
  author,
  setAuthor,
  authorImage,
  setAuthorImage,
  image,
  setImage,
  editingId,
  isPublishing,
  handlePublish,
  handleCancel,
  categoryLabel,
}) => {
  const quillRef = useRef(null);
  const videoInputRef = useRef(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeError, setYoutubeError] = useState("");

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          video: () => videoInputRef.current?.click(),
        },
      },
    }),
    []
  );

  const handleImageUpload = (e, target) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (target === "cover") {
        setImage(reader.result);
      } else if (target === "author") {
        setAuthorImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadToCloudinary(file, 'video');
      const editor = quillRef.current?.getEditor();
      if (!editor) return;

      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, "uploadedVideo", url, "user");
      editor.insertText(range.index + 1, "\n", "user");
      editor.setSelection(range.index + 2, 0, "silent");
    } catch (err) {
      console.error("Video upload failed", err);
      alert("Failed to upload video");
    } finally {
      e.target.value = "";
    }
  };

  const getYoutubeEmbedUrl = (value) => {
    try {
      const url = new URL(value.trim());
      let videoId = "";

      if (url.hostname === "youtu.be") {
        videoId = url.pathname.slice(1).split("/")[0];
      } else if (url.hostname.endsWith("youtube.com")) {
        if (url.pathname === "/watch") {
          videoId = url.searchParams.get("v") || "";
        } else if (
          url.pathname.startsWith("/embed/") ||
          url.pathname.startsWith("/shorts/")
        ) {
          videoId = url.pathname.split("/")[2] || "";
        }
      }

      return /^[a-zA-Z0-9_-]{11}$/.test(videoId)
        ? `https://www.youtube.com/embed/${videoId}`
        : "";
    } catch {
      return "";
    }
  };

  const handleYoutubeEmbed = () => {
    const embedUrl = getYoutubeEmbedUrl(youtubeUrl);
    if (!embedUrl) {
      setYoutubeError("Enter a valid YouTube video, Shorts, share, or embed link.");
      return;
    }

    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const range = editor.getSelection(true);
    editor.insertEmbed(range.index, "video", embedUrl, "user");
    editor.insertText(range.index + 1, "\n", "user");
    editor.setSelection(range.index + 2, 0, "silent");
    setYoutubeUrl("");
    setYoutubeError("");
  };

  return (
    <form onSubmit={handlePublish} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left / Main Column: Title, Excerpt & Content */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-neutral-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <span>📑 Article Overview</span>
          </h2>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Article Title *
            </label>
            <InputBox
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a compelling headline..."
              className="w-full !rounded-xl !py-3.5 !px-4 !border-gray-300 focus:!border-[#6C141E] focus:!ring-2 focus:!ring-[#6C141E]/30 font-bold text-base text-neutral-900"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Short Excerpt / Description * (Shown on Blog Grid Cards)
            </label>
            <textarea
              rows="3"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Provide a 2-3 sentence summary that hooks the reader..."
              className="w-full rounded-xl p-4 border border-gray-300 focus:border-[#6C141E] focus:outline-none focus:ring-2 focus:ring-[#6C141E]/30 font-medium text-sm text-neutral-800 transition-all"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
                Full Article Content (Markdown Supported)
              </label>
              <span className="text-xs text-neutral-400 font-medium">
                {content.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <div className="mt-2 text-neutral-800">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "indent",
                  "link",
                  "image",
                  "video",
                  "uploadedVideo",
                ]}
                className="bg-white rounded-xl overflow-hidden [&_.ql-toolbar]:rounded-t-xl [&_.ql-toolbar]:border-gray-300 [&_.ql-toolbar]:bg-gray-50 [&_.ql-container]:rounded-b-xl [&_.ql-container]:border-gray-300 [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-base [&_.ql-editor]:font-sans"
                placeholder="Write your comprehensive article here..."
              />
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
                aria-label="Upload article video"
              />
              <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
                <label
                  htmlFor="youtube-video-url"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-700"
                >
                  Embed YouTube Video
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    id="youtube-video-url"
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => {
                      setYoutubeUrl(e.target.value);
                      setYoutubeError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleYoutubeEmbed();
                      }
                    }}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-neutral-800 outline-none focus:border-[#6C141E] focus:ring-2 focus:ring-[#6C141E]/30"
                  />
                  <button
                    type="button"
                    onClick={handleYoutubeEmbed}
                    className="rounded-lg border border-[#6C141E] bg-[#6C141E] px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-[#8B1A27]"
                  >
                    Add YouTube Video
                  </button>
                </div>
                {youtubeError && (
                  <p className="mt-2 text-xs font-medium text-red-600">{youtubeError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Metadata & Publishing Controls */}
      <div className="space-y-6">
        {/* Publishing Box */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-neutral-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <span>⚡ Publish Controls</span>
          </h2>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Category Topic
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl py-3 px-4 border border-gray-300 bg-white font-semibold text-sm text-neutral-900 focus:border-[#6C141E] focus:outline-none focus:ring-2 focus:ring-[#6C141E]/30 cursor-pointer"
            >
              {BLOG_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Read Time
              </label>
              <InputBox
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
                className="w-full !rounded-xl !py-2.5 !px-3 !border-gray-300 font-medium text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Author Name
              </label>
              <InputBox
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Flowbee Team"
                className="w-full !rounded-xl !py-2.5 !px-3 !border-gray-300 font-medium text-xs mb-2"
              />
              <ImageUploader 
                value={authorImage} 
                onChange={setAuthorImage} 
                placeholder="Author Image" 
              />
            </div>
          </div>

          <div>
            <ImageUploader 
              label="Cover Image" 
              value={image} 
              onChange={setImage} 
              placeholder="Drag and drop a cover image here"
              className="mb-3"
            />

            {/* Quick Sample Image Selector */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-neutral-500 uppercase block">
                Or select a verified sample banner:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {SAMPLE_IMAGES.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImage(imgUrl)}
                    className={`h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      image === imgUrl
                        ? "border-[#6C141E] scale-105 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt={`Sample ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Button
              type="submit"
              disabled={isPublishing}
              className="w-full !bg-[#6C141E] hover:!bg-[#8B1A27] active:scale-[0.98] !text-white !font-extrabold !py-3.5 !rounded-xl transition-all shadow-[4px_4px_0px_0px_#4A0D14] hover:shadow-[2px_2px_0px_0px_#4A0D14] text-sm flex items-center justify-center gap-2"
            >
              {isPublishing ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>{editingId ? "Updating..." : "Broadcasting..."}</span>
                </>
              ) : (
                <>
                  <span>✨ {editingId ? "Update Blog Article" : "Publish Blog Article"}</span>
                </>
              )}
            </Button>
            {editingId && (
              <Button
                type="button"
                onClick={handleCancel}
                className="w-full !bg-white hover:!bg-gray-50 !text-black !font-bold !py-2.5 !rounded-xl transition-all border border-gray-200 shadow-sm text-sm"
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </div>

        {/* Quick Live Preview Mini-Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-3">
            Live Thumbnail Preview
          </span>
          <div className="rounded-2xl overflow-hidden border border-gray-200/80 shadow-md">
            <div className="h-36 relative bg-gray-100 overflow-hidden">
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
              <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-neutral-800 border border-gray-200/50 shadow-sm">
                {categoryLabel}
              </span>
            </div>
            <div className="p-4 bg-white">
              <div className="text-[11px] text-neutral-400 mb-1 font-medium">
                {readTime} • By {author}
              </div>
              <h4 className="font-bold text-sm text-neutral-900 line-clamp-2 leading-snug">
                {title || "Untitled Article"}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
