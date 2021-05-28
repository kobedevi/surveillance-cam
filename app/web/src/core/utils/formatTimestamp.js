const formatTimestamp = (timestamp) => {
  return new Date(
    timestamp.toDate().getTime() - 2 * 60 * 60 * 1000 // Remove timezone
  ).toLocaleString();
};

export default formatTimestamp;
