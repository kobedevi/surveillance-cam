import { IoMdDownload, IoMdLock, IoMdUnlock } from "react-icons/io";
import useStorageURL from "../../../core/hooks/queries/useStorageURL";
import formatDate from "../../../core/utils/formatDate";
import { Button } from "../../Design";
import Video from "./Video";

const VideoCard = ({recording, mutation}) => {

    // console.log(recording)
    const toggleLock = (recording) => {
        mutation.mutate({ id: recording.id, changes: { lock: !recording.lock } });
    };

    const { data: videoURL, ...videoQuery } = useStorageURL(recording.video);
    const { data: photoURL, ...photoQuery } = useStorageURL(recording.photo);

    return(
        <article key={recording.id}>
            <p>{formatDate(recording.timeOfMotion, 'H:mm')}</p>
            <div className="timeline"></div>
            <Video videoQuery={videoQuery} photoQuery={photoQuery} videoURL={videoURL} photoURL={photoURL} />
            <Button
                color={recording.lock ? 'primary' : 'muted'}
                className="lock"
                onClick={() => toggleLock(recording)}
                disabled={mutation.isLoading}
            >
                {recording.lock ? <IoMdLock /> : <IoMdUnlock />}
            </Button>
            {/* not allowed to directly download video files, so open in new tab to download theres */}
            <Button
                color="secondary"
                className="download"
                onClick={() => window.open(videoURL)}
            >
                <IoMdDownload />
            </Button>
        </article>
    )

}

export default VideoCard;