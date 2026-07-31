import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { uploadToCloudinary } from "./cloudinary";

export const uploadDataUrl = async (dataUrl) => {
  if (!dataUrl?.startsWith("data:")) return dataUrl;

  let resourceType = 'auto';
  if (dataUrl.startsWith("data:video")) {
    resourceType = 'video';
  } else if (dataUrl.startsWith("data:image")) {
    resourceType = 'image';
  }

  return await uploadToCloudinary(dataUrl, resourceType);
};

const uploadArticleMedia = async (content) => {
  if (!content || typeof DOMParser === "undefined") return content;

  const document = new DOMParser().parseFromString(content, "text/html");
  const mediaElements = [...document.body.querySelectorAll("img[src^='data:'], video[src^='data:']")];

  await Promise.all(
    mediaElements.map(async (element) => {
      let resourceType = 'auto';
      if (element.tagName.toLowerCase() === 'video') resourceType = 'video';
      else if (element.tagName.toLowerCase() === 'img') resourceType = 'image';

      const url = await uploadToCloudinary(element.getAttribute("src"), resourceType);
      element.setAttribute("src", url);
    })
  );

  return document.body.innerHTML;
};

export const saveBlogToFirebase = async (blog) => {
  const blogId = String(blog.id);
  const [image, authorImage, content] = await Promise.all([
    uploadDataUrl(blog.image),
    uploadDataUrl(blog.authorImage),
    uploadArticleMedia(blog.content),
  ]);

  const storedBlog = {
    ...blog,
    id: blogId,
    image,
    authorImage,
    content,
    createdAt: blog.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await setDoc(doc(db, "posts", blogId), storedBlog);
  return storedBlog;
};

export const getFirebaseBlogs = async () => {
  const snapshot = await getDocs(collection(db, "posts"));
  return snapshot.docs.map((blogDoc) => ({
    ...blogDoc.data(),
    id: blogDoc.id,
  }));
};

export const deleteBlogFromFirebase = (id) => deleteDoc(doc(db, "posts", String(id)));
