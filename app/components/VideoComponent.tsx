import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { IVideo } from "@/models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
     <div className="card-responsive bg-base-100 shadow">
      <figure className="relative px-2 sm:px-3 pt-2 sm:pt-3">
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div
            className="rounded-lg sm:rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.controls}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </figure>

      <div className="card-body p-2 sm:p-3 md:p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-base sm:text-lg line-clamp-2">
            {video.title}
          </h2>
        </Link>

        <p className="text-xs sm:text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}
