export const getLatestNotices = (notices, count) => {
    return notices
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, count);
  };
  