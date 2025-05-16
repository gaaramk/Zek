import Image from "next/image";

const Gallery = () => {
  return (
    <section className="py-36">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          🖼️ Explore Our Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, colIndex) => (
            <div className="grid gap-6" key={colIndex}>
              {[...Array(3)].map((_, rowIndex) => {
                const images = [
                  ["./images/colle.jpg", "./images/cover4.jpg", "./images/g7.jpg"],
                  ["./images/g9.jpg", "./images/g3.jpg", "./images/g5.jpg"],
                  ["./images/g4.jpg", "./images/g1.jpg", "./images/colle2.jpg"],
                  [
                    "./images/colle2.jpg",
                    "./images/special.jpg",
                    "./images/g2.jpg",
                  ],
                ];
                const src = images[colIndex][rowIndex];

                return (
                  <div
                    key={rowIndex}
                    className="overflow-hidden rounded-xl shadow hover:shadow-lg transition duration-300 transform hover:scale-105"
                  >
                    <Image
                      width={1000}
                      height={1000}
                      src={src}
                      alt={`Gallery ${colIndex}-${rowIndex}`}
                      className="w-full h-auto object-cover transition duration-300"
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
