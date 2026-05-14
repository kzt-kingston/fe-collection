import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ElNotification } from 'element-plus';

const STORAGE_KEY = 'bookmarks';

const notify = (action) =>
  ElNotification({
    title: action === 'added' ? 'Bookmark Saved' : 'Bookmark Removed',
    message: action === 'added' ? 'Bookmark saved successfully' : 'Bookmark removed successfully',
    type: action === 'added' ? 'success' : 'info',
    duration: 1000,
  });

export const useBookmarkStore = defineStore('bookmarks', () => {
  const bookmarks = ref(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);

  const persist = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks.value));
  };

  // If `category` is omitted, match by id + title only. If provided, match all three.
  const findIndex = (id, title, category) =>
    bookmarks.value.findIndex((b) => {
      if (b.id !== id || b.title !== title) return false;
      return category === undefined ? true : b.category === category;
    });

  const isBookmarked = (id, title, category) => findIndex(id, title, category) !== -1;

  const toggle = ({ id, title, url, category, resourceType }) => {
    const idx = findIndex(id, title, category);
    if (idx !== -1) {
      bookmarks.value.splice(idx, 1);
      persist();
      notify('removed');
      return false;
    }
    bookmarks.value.push({ id, title, url, category, resourceType });
    persist();
    notify('added');
    return true;
  };

  const remove = (id, title, category) => {
    const idx = findIndex(id, title, category);
    if (idx === -1) return;
    bookmarks.value.splice(idx, 1);
    persist();
    notify('removed');
  };

  const replaceAll = (list) => {
    bookmarks.value = list;
    persist();
  };

  const clear = () => {
    bookmarks.value = [];
    localStorage.removeItem(STORAGE_KEY);
  };

  return { bookmarks, isBookmarked, toggle, remove, replaceAll, clear };
});
