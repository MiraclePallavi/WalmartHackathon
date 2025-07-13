"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Twin {
  _id: string;
  title: string;
  description: string;
  relationship: string;
  gender: string;
  dateOfBirth?: string;
}

export default function TwinDashboard() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [twin, setTwin] = useState<Twin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/twins/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTwin(data.error ? null : data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (!twin) return <p>Twin not found.</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard: {twin.title}</h1>
      <div className="space-y-2">
        <p><strong>Relationship:</strong> {twin.relationship}</p>
        <p><strong>Gender:</strong> {twin.gender}</p>
        {twin.dateOfBirth && (
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(twin.dateOfBirth).toLocaleDateString()}
          </p>
        )}
        <p><strong>Description:</strong> {twin.description}</p>
      </div>

      <section className="mt-8 p-6 border rounded">
        <h2 className="text-2xl font-semibold mb-2">Shopping Dashboard</h2>
        <p className="text-gray-600">Recommendations coming soon…</p>
      </section>
    </div>
  );
}
