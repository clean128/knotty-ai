import { useState, useEffect } from "react";
import { apiService } from "../services/apiService";
import LoadingSpinner from "../components/LoadingSpinner";
import { 
  PhotoIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

const History = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const imageHistory = await apiService.getImageHistory();
        setImages(imageHistory);
      } catch (err) {
        setError("Failed to load image history");
        // Mock data for demo
        setImages([
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbmVyYXRlZCBJbWFnZSAxPC90ZXh0Pjwvc3ZnPg==",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbmVyYXRlZCBJbWFnZSAyPC90ZXh0Pjwvc3ZnPg==",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNTU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbmVyYXRlZCBJbWFnZSAzPC90ZXh0Pjwvc3ZnPg==",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbmVyYXRlZCBJbWFnZSA0PC90ZXh0Pjwvc3ZnPg==",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNzc3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbmVyYXRlZCBJbWFnZSA1PC90ZXh0Pjwvc3ZnPg==",
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjODg4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdlbmVyYXRlZCBJbWFnZSA2PC90ZXh0Pjwvc3ZnPg==",
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="glass-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl">
              <PhotoIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
                Image History
              </h1>
              <p className="text-neutral-400 font-medium">
                Your generated masterpieces
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-dark-800/30 rounded-xl backdrop-blur-sm">
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400" />
            <span className="text-neutral-400 font-medium">{images.length} images</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-yellow-300 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <MagnifyingGlassIcon className="w-5 h-5" />
            <span className="font-medium">{error} - Showing demo images</span>
          </div>
        </div>
      )}

      {images.length === 0 ? (
        <div className="section text-center py-16">
          <div className="p-4 bg-neutral-500/20 rounded-2xl w-fit mx-auto mb-4">
            <PhotoIcon className="w-12 h-12 text-neutral-400" />
          </div>
          <h3 className="text-xl font-display font-semibold text-neutral-300 mb-2">
            No images found
          </h3>
          <p className="text-neutral-500">
            Generate some images to see them here!
          </p>
        </div>
      ) : (
        <div className="section">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[4/5] bg-dark-700/50 rounded-2xl overflow-hidden hover:ring-2 hover:ring-primary-500/50 transition-all duration-300 hover:scale-105"
              >
                <img
                  src={image}
                  alt={`Generated Image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <button
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = image;
                        link.download = `image-${index + 1}.png`;
                        link.click();
                      }}
                      className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
                    >
                      <ArrowDownTrayIcon className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;