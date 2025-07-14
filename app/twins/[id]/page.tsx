"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, UserCircle } from "lucide-react";

interface Twin {
  _id: string;
  title: string;
  description: string;
  relationship: string;
  gender: string;
  dateOfBirth?: string;
}

interface Recommendation {
  product_id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
  url: string;
  match_score: number;
}

export default function TwinDashboard() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [twin, setTwin] = useState<Twin | null>(null);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/twins/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTwin(data.error ? null : data);
      });

    fetch(`/api/twins/${id}/recommendations`)
      .then((res) => res.json())
      .then((data) => {
        setRecs(Array.isArray(data) ? data : []);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading…</p>;
  if (!twin) return <p className="text-center text-red-500 mt-10">Twin not found.</p>;

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      {/* Header Section */}
     <h1 className="text-3xl font-bold text-blue-800">
  Twin Profile: {twin.title} 
</h1>
<p className="text-gray-600">Here are recommendations curated for {twin.title}.</p>


      {/* Twin Info Section */}
      <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg p-6 shadow-inner mb-10">
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <p><span className="font-semibold">Relationship:</span> {twin.relationship}</p>
          <p><span className="font-semibold">Gender:</span> {twin.gender}</p>
          {twin.dateOfBirth && (
            <p>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {new Date(twin.dateOfBirth).toLocaleDateString()}
            </p>
          )}
          <p className="sm:col-span-2">
            <span className="font-semibold">Description:</span> {twin.description}
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🛍️ Recommended Products</h2>
        {recs.length === 0 ? (
          <p className="text-gray-500">No recommendations found for this twin.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recs.map((product) => (
              <Card
                key={product.product_id}
                className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border border-gray-200 rounded-xl"
              >
                <div className="h-48 overflow-hidden rounded-t-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardContent className="p-4 space-y-3">
                  <h3 className="text-md font-semibold line-clamp-2 text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.brand}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold">${product.price}</span>
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star size={16} className="mr-1" />
                      {product.match_score}
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white font-medium"
                  >
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Product
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
