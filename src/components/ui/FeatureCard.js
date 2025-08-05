export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white rounded-xl shadow hover:shadow-md transition">
      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg">
        {icon}
      </div>
      <div>
        <h4 className="text-base font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
}
