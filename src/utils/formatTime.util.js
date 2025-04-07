const formatTime = (time) => {
  try {
    // Handle falsy values (null, undefined, empty string)
    if (!time) return "Invalid time";

    let postDate = time;
    console.log(time);
    // Handle Date object
    // if (time instanceof Date) {
    //   postDate = time;
    // }
    // // Handle string and number inputs
    // else if (typeof time === "string" || typeof time === "number") {
    //   postDate = new Date(time);
    // }
    // // Handle invalid types (objects, arrays, booleans, functions)
    // else {
    //   return "Invalid time";
    // }

    // // Check if postDate is valid
    // if (isNaN(postDate.getTime())) {
    //   return "Invalid time";
    // }

    const now = new Date();

    // Prevent negative timestamps (future dates)
    if (postDate > now) return "In the future";

    const timeDiff = Math.abs(now - postDate);
    const secondsDiff = Math.floor(timeDiff / 1000);
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(hoursDiff / 24);
    const weeksDiff = Math.floor(daysDiff / 7);
    const monthsDiff = Math.floor(daysDiff / 30);
    const yearsDiff = Math.floor(daysDiff / 365);

    if (secondsDiff < 60) return `${secondsDiff} seconds ago`;
    if (minutesDiff < 60) return `${minutesDiff} minutes ago`;
    if (hoursDiff < 24) return `${hoursDiff} hours ago`;
    if (daysDiff < 7) return `${daysDiff} days ago`;
    if (weeksDiff < 4) return `${weeksDiff} weeks ago`;
    if (monthsDiff < 12) return `${monthsDiff} months ago`;

    return `${yearsDiff} years ago`;
  } catch (error) {
    console.error("Error in formatTime:", error);
    return "Invalid time";
  }
};

export default formatTime;
