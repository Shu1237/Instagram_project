const formatTime = (time) => {
  try {
    const postDate = new Date(parseInt(time));
    const now = new Date();
    const timeDiff = Math.abs(now - postDate);

    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(hoursDiff / 24);
    const weeksDiff = Math.floor(daysDiff / 7);
    const monthsDiff = Math.floor(daysDiff / 30);
    const yearsDiff = Math.floor(daysDiff / 365);

    let timeAgo;
    if (secondsDiff < 60) {
      timeAgo = `${secondsDiff} seconds ago`;
    } else if (minutesDiff < 60) {
      timeAgo = `${minutesDiff} minutes ago`;
    } else if (hoursDiff < 24) {
      timeAgo = `${hoursDiff} hours ago`;
    } else if (daysDiff < 7) {
      timeAgo = `${daysDiff} days ago`;
    } else if (weeksDiff < 4) {
      timeAgo = `${weeksDiff} weeks ago`;
    } else if (monthsDiff < 12) {
      timeAgo = `${monthsDiff} months ago`;
    } else {
      timeAgo = `${yearsDiff} years ago`;
    }

    return timeAgo;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default formatTime;
