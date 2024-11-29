export interface Bookmark {
  id: number;
  title: string;
  url: string;
  category: string;
}

// get all bookmarks from local storage
export const getBookmarks = (): Bookmark[] => {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
};

export const bookmarks: Bookmark[] = getBookmarks();
