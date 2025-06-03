import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import { FaSpinner, FaMapMarkerAlt, FaPhoneAlt, FaInfoCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function CheckOut() {
  const { checkOutSession } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    details: Yup.string()
      .required('Address is required')
      .min(10, 'Address must be at least 10 characters'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number'),
    city: Yup.string()
      .required('City is required')
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await checkOutSession(values);
        if (response.status === "success") {
          window.location.href = response.session.url;
        }
      } catch (error) {
        toast.error("Checkout failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Complete Your Order</h2>
          <p className="mt-2 text-gray-600">Enter your shipping details</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Address Field */}
          <div className="relative">
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="details"
                name="details"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
                className={`pl-10 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ${formik.touched.details && formik.errors.details ? 'ring-red-500' : ''
                  }`}
                placeholder="Street address, apartment, etc."
              />
            </div>
            {formik.touched.details && formik.errors.details ? (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FaInfoCircle className="mr-1" /> {formik.errors.details}
              </p>
            ) : null}
          </div>

          {/* Phone Field */}
          <div className="relative">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhoneAlt className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className={`pl-10 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ${formik.touched.phone && formik.errors.phone ? 'ring-red-500' : ''
                  }`}
                placeholder="01XXXXXXXXX"
              />
            </div>
            {formik.touched.phone && formik.errors.phone ? (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FaInfoCircle className="mr-1" /> {formik.errors.phone}
              </p>
            ) : null}
          </div>

          {/* City Field */}
          <div className="relative">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <select
              id="city"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ${formik.touched.city && formik.errors.city ? 'ring-red-500' : ''
                }`}
            >
              <option value="">Select your city</option>
              <option value="Cairo">Cairo</option>
              <option value="Alexandria">Alexandria</option>
              <option value="Giza">Giza</option>
              <option value="Luxor">Luxor</option>
              <option value="Aswan">Aswan</option>
              <option value="Other">Other</option>
            </select>
            {formik.touched.city && formik.errors.city ? (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FaInfoCircle className="mr-1" /> {formik.errors.city}
              </p>
            ) : null}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !formik.isValid}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${isSubmitting || !formik.isValid ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Place Order & Continue to Payment'
              )}
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            <Link to="/cart" className="font-medium text-green-600 hover:text-green-500">
              ← Back to cart
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}