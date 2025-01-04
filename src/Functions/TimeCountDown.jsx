/**
 * Calculate the remaining time until the given deadline.
 * @param {string | Date} deadline - The deadline date/time as a string or Date object.
 * @returns {string} - The formatted remaining time as "Xd Xh Xm Xs" or "Time's up!".
 */
const getRemainingTime = (deadline) => {
  if (!deadline) return "No deadline provided";

  const deadlineDate = new Date(deadline);
  const now = new Date();
  const timeDiff = deadlineDate - now;

  if (timeDiff > 0) {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else {
    return "Time's up!";
  }
};

export default getRemainingTime;
