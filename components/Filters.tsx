'use client';

interface FilterProps {
  maxBudget: number;
  setMaxBudget: (value: number) => void;
  maxDistanceFromSchool: number;
  setMaxDistanceFromSchool: (value: number) => void;
  maxDistanceFromBusStop: number;
  setMaxDistanceFromBusStop: (value: number) => void;
  onReset: () => void;
}

export default function Filters({
  maxBudget,
  setMaxBudget,
  maxDistanceFromSchool,
  setMaxDistanceFromSchool,
  maxDistanceFromBusStop,
  setMaxDistanceFromBusStop,
  onReset,
}: FilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Filters</h3>

      {/* Budget Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Max Budget: {maxBudget.toLocaleString()} RWF
        </label>
        <input
          type="range"
          min="50000"
          max="500000"
          step="10000"
          value={maxBudget}
          onChange={(e) => setMaxBudget(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-900 mt-1">
          <span>50K</span>
          <span>500K</span>
        </div>
      </div>

      {/* Distance from School Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Max Distance from School: {maxDistanceFromSchool.toFixed(1)} km
        </label>
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.5"
          value={maxDistanceFromSchool}
          onChange={(e) => setMaxDistanceFromSchool(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-900 mt-1">
          <span>0.5 km</span>
          <span>10 km</span>
        </div>
      </div>

      {/* Distance from Bus Stop Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Max Distance from Bus Stop: {maxDistanceFromBusStop.toFixed(1)} km
        </label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={maxDistanceFromBusStop}
          onChange={(e) => setMaxDistanceFromBusStop(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-900 mt-1">
          <span>0.1 km</span>
          <span>5 km</span>
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={onReset}
        className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
      >
        Reset Filters
      </button>
    </div>
  );
}
