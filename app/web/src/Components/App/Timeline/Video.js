const Video = ({ videoQuery, photoQuery, videoURL, photoURL }) => {

  if (videoQuery.isLoading && photoQuery.isLoading) {
    return <video className="placeholder" width="640" controls></video>;
  }

  return (
    <video preload="none" poster={photoURL} width="640" controls>
      {videoURL && <source src={videoURL} type="video/mp4" />}
    </video>
  );
};

export default Video;
