export default function ExerciseImageModal({
  exercise,
  imageUrl,
  loading,
  onClose,
}) {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96">
        <h3 className="font-bold mb-3">{exercise}</h3>

        {loading && <p className="text-center">Generating image...</p>}

        {imageUrl && (
          <img src={imageUrl} alt={exercise} className="rounded-lg" />
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
