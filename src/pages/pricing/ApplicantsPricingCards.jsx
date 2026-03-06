import { Check } from "lucide-react";

const cvPlans = [
  {
    name: "Basic Plan",
    price: "3,000",
    period: "/month",
    billing: "30-day billing cycle",
    button: "Get Started",
    features: [
      "Manage up to 3 CVs",
      "Manage up to 3 CVs with premium features",
      "Premium templates",
      "3 PDF downloads",
      "Priority support",
    ],
  },
  {
    name: "Standard Plan",
    price: "30,000",
    period: "/month",
    billing: "30-day billing cycle",
    button: "Get Premium",
    features: [
      "Manage up to 50 CVs",
      "Access limited features with 50 CVs",
      "Gold templates",
      "50 PDF downloads",
      "Priority support",
    ],
  },
  {
    name: "Premium Plan",
    price: "50,000",
    period: "/month",
    billing: "60-day billing cycle",
    button: "Get Started",
    features: [
      "Manage up to 100 CVs",
      "Unlimited access for the entire month",
      "Diamond templates",
      "100 PDF downloads",
      "Priority support",
    ],
  },
];

export default function ApplicantsPricingCards() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {cvPlans.map((plan, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col
          hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
          {/* Plan Name */}
          <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>

          {/* Price */}
          <div className="mt-4">
            <span className="text-3xl font-bold text-gray-900">
              {plan.price} Tsh
            </span>
            <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
          </div>

          {/* Billing cycle */}
          <p className="text-gray-500 text-sm mt-1 mb-6">{plan.billing}</p>

          {/* Features */}
          <ul className="space-y-3 flex-1">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start text-sm text-gray-600">
                <Check className="w-4 h-4 text-green-600 mt-1 mr-3" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Button */}
          <button
            className="mt-8 w-full py-3 rounded-lg text-sm font-medium 
            bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {plan.button}
          </button>
        </div>
      ))}
    </div>
  );
}
