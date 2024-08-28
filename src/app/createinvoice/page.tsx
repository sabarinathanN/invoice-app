"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/components/SupaBase";
import { toWords } from "number-to-words";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Select, DatePicker, notification } from "antd";
import { Navbar } from "@/components";

interface Company {
  id: string;
  company_name: string;
}
interface Option {
  value: string;
  country: string;
}
interface Currency {
  name: string;
  symbole: string;
}

const CreateInvoice = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [inputDataProducts, setInputDataProducts] = useState({
    description: "",
    rate: 0,
    quantity: 0,
    gst: 0,
    discount: 0,
  });
  const [clientData, setClientData] = useState<any[]>([]);
  const [existingData, setExistingData] = useState<any[]>([]); // Initially an empty array
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const currencyData: Currency[] = [
    { name: "India", symbole: "₹" },
    { name: "USA", symbole: "$" },
    { name: "Hong Kong", symbole: "HK$" },
    { name: "Malaysia", symbole: "RM" },
    { name: "Singapore", symbole: "S$" },
    { name: "Australia", symbole: "A$" },
    { name: "UK - Pound", symbole: "£" },
    { name: "UK - Euro", symbole: "€" },
    { name: "UAE", symbole: "د.إ" },
    { name: "Sri Lanka", symbole: "Rs" },
  ];

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("companylist").select("*");
      if (error) throw error;
      setData(data);
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.message || "An error occurred while fetching companies.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchClientData = async () => {
    try {
      const { data, error } = await supabase.from("clientlist").select("*");
      if (error) throw error;
      setClientData(data);
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.message || "An error occurred while fetching clients.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchClientData();
  }, []);

  const addProducts = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = [...existingData, inputDataProducts];
    setExistingData(updatedData);
    setInputDataProducts({
      description: "",
      rate: 0,
      quantity: 0,
      gst: 0,
      discount: 0,
    });
  };

  const calculateTotals = (data: any[]) => {
    let totalAmount = 0;
    let totalDiscountAmount = 0;

    data.forEach((option) => {
      const amount = option.rate * option.quantity;
      const discountPrice = (amount * option.discount) / 100;
      const totalDisAmt = amount - discountPrice;
      const gstAmount = (totalDisAmt * option.gst) / 100;
      const total = gstAmount + totalDisAmt;

      totalAmount += total;
      totalDiscountAmount += discountPrice;
    });

    return {
      totalAmount,
      totalDiscountAmount,
      totalAmountInWords: toWords(totalAmount),
      totalDiscountAmountInWords: toWords(totalDiscountAmount),
    };
  };

  const totals = calculateTotals(existingData);

  const createInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const invoiceId = Math.floor(1000 + Math.random() * 9000).toString();
      const { data: invoiceData, error: invoiceError } = await supabase
        .from("invoicelist")
        .insert({
          invoice_id: invoiceId,
          company_id: form.getFieldValue("companyName"),
          client_id: form.getFieldValue("client_id"),
          invoice_number: form.getFieldValue("invoiceId"),
          invoice_date: form.getFieldValue("invoiceDate"),
          invoice_currency: form.getFieldValue("currency"),
          total_amount: totals.totalAmount,
          invoice_end_date: form.getFieldValue("invoiceDueDate"),
        })
        .select();

      if (invoiceError) throw invoiceError;

      const invoiceItemsData = existingData.map((item) => ({
        invoice_id: invoiceId,
        item_id: Math.floor(1000 + Math.random() * 9000).toString(),
        description: item.description,
        quantity: item.quantity,
        per_unit_price: item.rate,
        gst_percentage: item.gst,
        discount_percentage: item.discount,
      }));

      const { error: invoiceItemsError } = await supabase
        .from("invoice_items")
        .insert(invoiceItemsData);

      if (invoiceItemsError) throw invoiceItemsError;

      notification.success({
        message: "Success",
        description: "Invoice created successfully!",
      });

      setExistingData([]); // Clear the products list after invoice creation
      router.push("/invoice");
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.message || "An error occurred while creating the invoice.",
      });
      console.error("Error inserting data:", error.message);
    }
  };

  const deleteProducts = (index: number) => {
    const latestData = existingData.filter((_, i) => i !== index);
    setExistingData(latestData);
  };

  return (
    <>
      <Navbar />
      <div className="container w-10/12 mt-32">
        <div className="invoice">
          <div className="text-center mb-4">
            <h1 className="text-2xl">Create Invoice</h1>
          </div>
          <h4 className="text-base text-gray-800">Company Details</h4>
          <hr className="my-4" />
          <div className="mb-5">
            <div className="mb-6">
              <Form form={form} layout="vertical" className="mt-6">
                <Form.Item
                  name="companyName"
                  className="mb-3"
                  label={
                    <span className="font-semibold antialiased text-sm text-slate-600">
                      Select Company
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please select a company!",
                    },
                  ]}
                >
                  <Select
                    options={data.map((company) => ({
                      label: company.company_name,
                      value: company.id,
                    }))}
                    placeholder="Select Company"
                    onChange={(val) => form.setFieldValue("companyName", val)}
                  />
                </Form.Item>

                <Form.Item
                  label="Select Date"
                  name="invoiceDate"
                  rules={[
                    {
                      required: true,
                      message: "Please select a date",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  label="Select Due Date"
                  name="invoiceDueDate"
                  rules={[
                    {
                      required: true,
                      message: "Please select a due date",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  name="invoiceId"
                  label={
                    <span className="font-semibold antialiased text-sm text-slate-600">
                      Invoice Id
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please input your Invoice Id",
                    },
                  ]}
                >
                  <Input placeholder="Enter Invoice Id" />
                </Form.Item>

                <Form.Item
                  name="currency"
                  className="mb-3"
                  label={
                    <span className="font-semibold antialiased text-sm text-slate-600">
                      Select Currency
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please select currency!",
                    },
                  ]}
                >
                  <Select
                    options={currencyData.map((currency) => ({
                      label: `${currency.name} ${currency.symbole}`,
                      value: currency.symbole,
                    }))}
                    placeholder="Select Currency"
                    onChange={(val) => form.setFieldValue("currency", val)}
                  />
                </Form.Item>

                <Form.Item
                  name="client_id"
                  className="mb-3"
                  label={
                    <span className="font-semibold antialiased text-sm text-slate-600">
                      Select Client
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please select a Client!",
                    },
                  ]}
                >
                  <Select
                    options={clientData?.map((client) => ({
                      label: client.company_name,
                      value: client.client_id,
                    }))}
                    placeholder="Select Client"
                    onChange={(val) => form.setFieldValue("client_id", val)}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-4">
            <Input
              placeholder="Description"
              value={inputDataProducts.description}
              onChange={(e) =>
                setInputDataProducts({
                  ...inputDataProducts,
                  description: e.target.value,
                })
              }
            />
            <Input
              placeholder="Rate"
              value={inputDataProducts.rate}
              type="number"
              onChange={(e) =>
                setInputDataProducts({
                  ...inputDataProducts,
                  rate: parseFloat(e.target.value),
                })
              }
            />
            <Input
              placeholder="Quantity"
              value={inputDataProducts.quantity}
              type="number"
              onChange={(e) =>
                setInputDataProducts({
                  ...inputDataProducts,
                  quantity: parseInt(e.target.value),
                })
              }
            />
            <Input
              placeholder="GST (%)"
              value={inputDataProducts.gst}
              type="number"
              onChange={(e) =>
                setInputDataProducts({
                  ...inputDataProducts,
                  gst: parseFloat(e.target.value),
                })
              }
            />
            <Input
              placeholder="Discount (%)"
              value={inputDataProducts.discount}
              type="number"
              onChange={(e) =>
                setInputDataProducts({
                  ...inputDataProducts,
                  discount: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="flex mt-2">
            <Button type="primary" onClick={addProducts} disabled={!inputDataProducts.description}>
              Add
            </Button>
          </div>

          <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Rate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GST
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {existingData.map((option:any, index:any) => {
                  const amount = option.rate * option.quantity;
                  const discountPrice = (amount * option.discount) / 100;
                  const totalDisAmt = amount - discountPrice;
                  const gstAmount = (totalDisAmt * option.gst) / 100;
                  const total = gstAmount + totalDisAmt;
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4">{option.description}</td>
                      <td className="px-6 py-4">{option.rate}</td>
                      <td className="px-6 py-4">{option.quantity}</td>
                      <td className="px-6 py-4">{option.gst}</td>
                      <td className="px-6 py-4">{option.discount}</td>
                      <td className="px-6 py-4">{total}</td>
                      <td className="px-6 py-4">
                        <Button
                          type="link"
                          onClick={() => deleteProducts(index)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <h4 className="text-base text-gray-800 mt-4">Invoice Summary</h4>
            <hr className="my-4" />
            <p><span className="text-black">Total Amount:</span> {totals.totalAmount}</p>
            <p><span className="text-black">Total Discount:</span> {totals.totalDiscountAmount}</p>
            <p><span className="text-black">Total Amount in Words:</span> {totals.totalAmountInWords}</p>
          </div>

          <div className="flex justify-center mb-4">
            <Button
              type="primary"
              onClick={createInvoice}
              disabled={existingData.length === 0}
               className="bg-blue-600"
            >
              Create Invoice
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInvoice;
