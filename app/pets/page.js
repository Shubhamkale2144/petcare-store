import Link from 'next/link'

export default function PetsPage() {
  const pets = [
    { id: 1, name: "Buddy", type: "Dog", breed: "Golden Retriever", age: 2, price: 300, image: "🐕" },
    { id: 2, name: "Whiskers", type: "Cat", breed: "Persian", age: 1, price: 200, image: "🐈" },
    { id: 3, name: "Snowball", type: "Rabbit", breed: "Himalayan", age: 1, price: 150, image: "🐇" },
    { id: 4, name: "Max", type: "Dog", breed: "Labrador", age: 3, price: 250, image: "🐕" },
    { id: 5, name: "Luna", type: "Cat", breed: "Siamese", age: 2, price: 180, image: "🐈" },
    { id: 6, name: "Coco", type: "Bird", breed: "Parrot", age: 1, price: 100, image: "🦜" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="text-blue-500 hover:text-blue-600">← Back to Home</Link>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">Available Pets</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map(pet => (
            <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="text-6xl text-center py-8 bg-gray-100">
                {pet.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{pet.name}</h3>
                <p className="text-gray-600 mb-1"><span className="font-semibold">Type:</span> {pet.type}</p>
                <p className="text-gray-600 mb-1"><span className="font-semibold">Breed:</span> {pet.breed}</p>
                <p className="text-gray-600 mb-1"><span className="font-semibold">Age:</span> {pet.age} year{pet.age > 1 ? 's' : ''}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-green-600">${pet.price}</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                    Adopt Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}