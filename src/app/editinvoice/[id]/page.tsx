"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/components/SupaBase";
import { toWords } from "number-to-words";
import { useRouter, useParams } from "next/navigation";
import { Form, Input, Button, Select, DatePicker, notification } from "antd";
import { Navbar } from "@/components";
import moment from "moment";

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

const EditInvoice = () => {
  const router = useRouter();
  const { id } = useParams();
  const invoiceId = id;
  const [form] = Form.useForm();
  const [newProduct, setNewProduct] = useState({
    description: "",
    per_unit_price: 0,
    quantity: 0,
    gst_percentage: 0,
    discount_percentage: 0,
  });
  const [clientData, setClientData] = useState<any[]>([]);
  const [existingData, setExistingData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [FormData, setFormData] = useState<any[]>([]);

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

  const fetchInvoiceData = async () => {
    if (!invoiceId) return;
    try {
      const { data, error } = await supabase
        .from("invoicelist")
        .select("*, companylist(*),clientlist(*),invoice_items(*)")
        .eq("invoice_id", id);
      if (error) throw error;

      const fetcheddata = data[0];
      console.log("yyyyyyyyyyyyyyy",fetcheddata)
      form.setFieldsValue({
        companyName: fetcheddata.company_id,
        invoiceDate: moment(fetcheddata.invoice_date), // Convert to moment object
        invoiceDueDate: moment(fetcheddata.invoice_end_date), // Convert to moment object
        invoiceId: fetcheddata.invoice_number,
        currency: fetcheddata.invoice_currency,
        client_id: fetcheddata.client_id,
      });
      setFormData(fetcheddata);

      setExistingData(fetcheddata.invoice_items || []);
    } catch (error: any) {
      notification.error({
        message: "Error",
        description:
          error.message ||
          "An error occurred while fetching the invoice data.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchClientdata = async () => {
    try {
      const { data, error } = await supabase.from("clientlist").select("*");
      if (error) throw error;
      setClientData(data);
    } catch (error: any) {
      notification.error({
        message: "Error",
        description:
          error.message || "An error occurred while fetching clients.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyData = async () => {
    try {
      const { data, error } = await supabase.from("companylist").select("*");
      if (error) throw error;
      setData(data);
    } catch (error: any) {
      notification.error({
        message: "Error",
        description:
          error.message || "An error occurred while fetching companies.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoiceData();
    fetchClientdata();
    fetchCompanyData();
  }, [invoiceId]);

  const updateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const totals = calculateTotals(existingData);
      const { data: invoiceData, error: invoiceError } = await supabase
        .from("invoicelist")
        .update({
          company_id: form.getFieldValue("companyName"),
          client_id: form.getFieldValue("client_id"),
          invoice_number: form.getFieldValue("invoiceId"),
          invoice_date: form.getFieldValue("invoiceDate"),
          invoice_currency: form.getFieldValue("currency"),
          total_amount: totals.totalAmount,
          invoice_end_date: form.getFieldValue("invoiceDueDate"),
        })
        .eq("invoice_id", invoiceId)
        .select();

      if (invoiceError) throw invoiceError;

      await supabase
        .from("invoice_items")
        .delete()
        .eq("invoice_id", invoiceId);

      const invoiceItemsData = existingData.map((item) => ({
        invoice_id: invoiceId,
        item_id: Math.floor(1000 + Math.random() * 9000).toString(),
        description: item.description,
        quantity: item.quantity,
        per_unit_price: item.per_unit_price,
        gst_percentage: item.gst_percentage,
        discount_percentage: item.discount_percentage,
      }));

      const { error: invoiceItemsError } = await supabase
        .from("invoice_items")
        .insert(invoiceItemsData);

      if (invoiceItemsError) throw invoiceItemsError;

      notification.success({
        message: "Success",
        description: "Invoice updated successfully!",
      });

      router.push("/invoice");
    } catch (error: any) {
      notification.error({
        message: "Error",
        description:
          error.message || "An error occurred while updating the invoice.",
      });
      console.error("Error updating data:", error.message);
    }
  };

  const handleProductChange = (index: number, key: string, value: any) => {
    const updatedData = [...existingData];
    updatedData[index] = { ...updatedData[index], [key]: value };
    setExistingData(updatedData);
  };

  const calculateTotals = (data: any[]) => {
    let totalAmount = 0;
    let totalDiscountAmount = 0;

    data.forEach((option) => {
      const amount = option.per_unit_price * option.quantity;
      const discountPrice = (amount * option.discount_percentage) / 100;
      const totalDisAmt = amount - discountPrice;
      const gstAmount = (totalDisAmt * option.gst_percentage) / 100;
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

  const deleteProduct = (index: number) => {
    const latestData = existingData.filter((_, i) => i !== index);
    setExistingData(latestData);
  };

  const addNewProduct = () => {
    setExistingData([...existingData, { ...newProduct }]);
    setNewProduct({
      description: "",
      per_unit_price: 0,
      quantity: 0,
      gst_percentage: 0,
      discount_percentage: 0,
    });
  };

  return (
    <>
      <Navbar />
      <div className="container w-10/12 mt-32">
        <div className="invoice">
          <div className="text-center mb-4">
            <h1 className="text-2xl">Edit Invoice</h1>
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
                  <DatePicker
                    placeholder="Invoice Date"
                    format={"DD-MM-YYYY"}
                    className="w-full"
                  />
                </Form.Item>

                <Form.Item
                  label="Select Due Date"
                  name="invoiceDueDate"
                  rules={[
                    {
                      required: true,
                      message: "Please select the due date",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Invoice Due Date"
                    format={"DD-MM-YYYY"}
                    className="w-full"
                  />
                </Form.Item>

                <Form.Item
                  label="Invoice ID"
                  name="invoiceId"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the invoice id",
                    },
                  ]}
                >
                  <Input placeholder="Invoice Id" />
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
                      message: "Please select a currency!",
                    },
                  ]}
                >
                  <Select
                    options={currencyData.map((curr) => ({
                      label: `${curr.name} (${curr.symbole})`,
                      value: curr.symbole,
                    }))}
                    placeholder="Select Currency"
                    onChange={(val) => form.setFieldValue("currency", val)}
                  />
                </Form.Item>

                <Form.Item
                  label="Select Client"
                  name="client_id"
                  rules={[
                    {
                      required: true,
                      message: "Please select a client!",
                    },
                  ]}
                >
                  <Select
                    options={clientData.map((client) => ({
                      label: client.company_name,
                      value: client.client_id,
                    }))}
                    placeholder="Select Client"
                    onChange={(val) => form.setFieldValue("client_id", val)}
                  />
                </Form.Item>

                <h4 className="text-base text-gray-800 mt-4">
                  Add Products Details
                </h4>
                <hr className="my-4" />

                {/* Existing Products */}
                {existingData.map((item, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded mb-4">
                    <Form.Item label={`Description`} required>
                      <Input
                        value={item.description}
                        onChange={(e) =>
                          handleProductChange(index, "description", e.target.value)
                        }
                      />
                    </Form.Item>
                    <Form.Item label={`Quantity`} required>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleProductChange(index, "quantity", e.target.value)
                        }
                      />
                    </Form.Item>
                    <Form.Item label={`Per Unit Price`} required>
                      <Input
                        type="number"
                        value={item.per_unit_price}
                        onChange={(e) =>
                          handleProductChange(index, "per_unit_price", e.target.value)
                        }
                      />
                    </Form.Item>
                    <Form.Item label={`GST Percentage`} required>
                      <Input
                        type="number"
                        value={item.gst_percentage}
                        onChange={(e) =>
                          handleProductChange(index, "gst_percentage", e.target.value)
                        }
                      />
                    </Form.Item>
                    <Form.Item label={`Discount Percentage`} required>
                      <Input
                        type="number"
                        value={item.discount_percentage}
                        onChange={(e) =>
                          handleProductChange(index, "discount_percentage", e.target.value)
                        }
                      />
                    </Form.Item>
                    <Button
                      type="primary"
                      danger
                      onClick={() => deleteProduct(index)}
                      className="mt-2"
                    >
                      Delete
                    </Button>
                  </div>
                ))}

                {/* New Product Form */}
                <h4 className="text-base text-gray-800 mt-4">
                  Add New Product
                </h4>
                <hr className="my-4" />
                <div className="bg-gray-100 p-4 rounded mb-4">
                  <Form.Item label="Description">
                    <Input
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, description: e.target.value })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Quantity">
                    <Input
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Per Unit Price">
                    <Input
                      type="number"
                      value={newProduct.per_unit_price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, per_unit_price: parseFloat(e.target.value) })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="GST Percentage">
                    <Input
                      type="number"
                      value={newProduct.gst_percentage}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, gst_percentage: parseFloat(e.target.value) })
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Discount Percentage">
                    <Input
                      type="number"
                      value={newProduct.discount_percentage}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, discount_percentage: parseFloat(e.target.value) })
                      }
                    />
                  </Form.Item>
                  <Button type="primary" className="bg-blue-600" onClick={addNewProduct}>
                    Add Product
                  </Button>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={updateInvoice}
                     className="bg-blue-600"
                  >
                    Update Invoice
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditInvoice;
