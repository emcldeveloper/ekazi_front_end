import React, { useState, useEffect } from "react";
import { Container, Form, Button, Modal, Table } from "react-bootstrap";
import { FaCalculator, FaUser, FaWhatsapp, FaEye } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import "../../css/jobseeker/Tax.css"; // Import your CSS file
import { CalculatorApi } from "../../Api/Calculator/SalaryApi";

const SalaryEstimation = () => {
  // State variables
  const [currencyType, setCurrencyType] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const [netPay, setNetPay] = useState("");
  const [basicPay, setBasicPay] = useState("");
  const [allowances, setAllowances] = useState([]);
  const [totalGross, setTotalGross] = useState(null);
  const [totalAllowance, setTotalAllowance] = useState(0);
  const [sscEmployee, setSscEmployee] = useState(0);
  const [pay, setPay] = useState(null);
  const [usageCount, setUsageCount] = useState(0);
  const [taxableAmount, setTaxableAmount] = useState(0);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [showCompanyCost, setShowCompanyCost] = useState(false);
  const [taxData, setTaxData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CalculatorApi.getsalaryrate();
        setTaxData(response.tax_rate);
        setUsageCount(response.insight);
        console.log("salary estimation data", response);
      } catch (error) {}
    };
    fetchData();
  }, []);

  // Calculate total allowance whenever allowances change
  useEffect(() => {
    const sum = allowances.reduce(
      (total, amount) => total + parseFloat(amount || 0),
      0,
    );
    setTotalAllowance(sum);
  }, [allowances]);

  // Main calculation effect
  useEffect(() => {
    calculateTaxableAmount();
  }, [
    basicPay,
    netPay,
    totalAllowance,
    salaryType,
    exchangeRate,
    currencyType,
  ]);

  // Add new allowance field
  const addAllowance = () => {
    setAllowances([...allowances, 0]);
  };

  // Remove allowance field
  const removeAllowance = (index) => {
    const newAllowances = [...allowances];
    newAllowances.splice(index, 1);
    setAllowances(newAllowances);
  };

  // Handle allowance amount change
  const handleAllowanceChange = (index, value) => {
    const newAllowances = [...allowances];
    newAllowances[index] = value > 100000000000 ? 0 : value;
    setAllowances(newAllowances);
  };

  // Calculate total gross salary
  const calculateTotalGross = () => {
    const gross = parseFloat(basicPay || 0) + parseFloat(totalAllowance || 0);
    setTotalGross(gross);
    return gross;
  };

  // Calculate taxable amount
  const calculateTaxableAmount = () => {
    if (salaryType === "gross") {
      const gross = calculateTotalGross();
      const ssc = gross * 0.1;
      setSscEmployee(ssc);
      const taxable = gross - ssc;
      calculatePayAmount(taxable);
      setNetPay(taxable - pay);
    } else if (salaryType === "net" && netPay) {
      estimateGrossSalary(parseFloat(netPay));
    }
  };

  // Calculate PAYE amount
  const calculatePayAmount = (taxableAmount) => {
    let payAmount = 0;

    if (currencyType === "usd" && exchangeRate > 0) {
      const rate = parseFloat(exchangeRate);
      const payoneReduction = taxData.payone_reduction / rate;
      const paytwoReduction = taxData.paytwo_reduction / rate;
      const paythreeReduction = taxData.paythree_reduction / rate;
      const payfourReduction = taxData.payfour_reduction / rate;

      const paytwoAddition = taxData.paytwo_addition / rate;
      const paythreeAddition = taxData.paythree_addition / rate;
      const payfourAddition = taxData.payfour_addition / rate;

      if (taxableAmount > payoneReduction && taxableAmount <= paytwoReduction) {
        payAmount =
          (taxableAmount - payoneReduction) * taxData.payone_percentage;
      } else if (
        taxableAmount > paytwoReduction &&
        taxableAmount <= paythreeReduction
      ) {
        payAmount =
          (taxableAmount - paytwoReduction) * taxData.paytwo_percentage +
          paytwoAddition;
      } else if (
        taxableAmount > paythreeReduction &&
        taxableAmount <= payfourReduction
      ) {
        payAmount =
          (taxableAmount - paythreeReduction) * taxData.paythree_percentage +
          paythreeAddition;
      } else if (taxableAmount > payfourReduction) {
        payAmount =
          (taxableAmount - payfourReduction) * taxData.payfour_percentage +
          payfourAddition;
      }
    } else {
      if (
        taxableAmount > taxData.payone_reduction &&
        taxableAmount <= taxData.paytwo_reduction
      ) {
        payAmount =
          (taxableAmount - taxData.payone_reduction) *
          taxData.payone_percentage;
      } else if (
        taxableAmount > taxData.paytwo_reduction &&
        taxableAmount <= taxData.paythree_reduction
      ) {
        payAmount =
          (taxableAmount - taxData.paytwo_reduction) *
            taxData.paytwo_percentage +
          taxData.paytwo_addition;
      } else if (
        taxableAmount > taxData.paythree_reduction &&
        taxableAmount <= taxData.payfour_reduction
      ) {
        payAmount =
          (taxableAmount - taxData.paythree_reduction) *
            taxData.paythree_percentage +
          taxData.paythree_addition;
      } else if (taxableAmount > taxData.payfour_reduction) {
        payAmount =
          (taxableAmount - taxData.payfour_reduction) *
            taxData.payfour_percentage +
          taxData.payfour_addition;
      }
    }

    setPay(payAmount);
    return payAmount;
  };

  // Estimate gross salary from net pay
  const estimateGrossSalary = (targetNetPay) => {
    const tolerance = 0.01;
    const maxIterations = 100;
    let minGross = targetNetPay;
    let maxGross = targetNetPay * 2.0;
    let iteration = 0;
    let calculatedNetPay = 0;
    let grossSalary = 0;
    let paye = 0;
    let taxableIncome = 0;
    let sscDeduction = 0;

    do {
      iteration++;
      grossSalary = (minGross + maxGross) / 2.0;
      sscDeduction = grossSalary * 0.1;
      taxableIncome = grossSalary - sscDeduction;

      paye = calculatePayAmount(taxableIncome);
      calculatedNetPay = grossSalary - sscDeduction - paye;

      if (calculatedNetPay < targetNetPay) {
        minGross = grossSalary;
      } else {
        maxGross = grossSalary;
      }
    } while (
      Math.abs(calculatedNetPay - targetNetPay) > tolerance &&
      iteration < maxIterations
    );

    setTaxableAmount(taxableIncome);
    setSscEmployee(sscDeduction);
    setTotalGross(grossSalary);
    setPay(paye);
    setBasicPay(grossSalary - totalAllowance);
  };

  // Format number with commas
  const formatNumber = (num) => {
    return num
      ? num.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "0.00";
  };

  // Add this function to calculate company costs
  const calculateCompanyCost = () => {
    if (!totalGross) return null;

    const employerSSC = totalGross * 0.1; // 10% of gross salary
    const sdl = totalGross * 0.035; // 3.5% of gross salary
    const wcf = totalGross * 0.005; // 0.5% of gross salary
    const grandTotal = totalGross + employerSSC + sdl + wcf;

    return {
      grossSalary: totalGross,
      employerSSC,
      sdl,
      wcf,
      grandTotal,
    };
  };

  // Download PDF
  const downloadPDF = () => {
    const element = document.getElementById("result");
    const opt = {
      margin: 10,
      filename: `salary_estimation_${new Date().getTime()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
  };
  // Add this useEffect hook to your component

  // Share on WhatsApp
  const shareOnWhatsApp = () => {
    const salaryTypeText = salaryType === "net" ? "Gross Salary" : "Net Salary";
    const salaryValue = salaryType === "net" ? totalGross : netPay;

    let message = `💰 *Salary Breakdown* 💰\n\n`;
    message += `✅ ${salaryTypeText}: ${formatNumber(salaryValue)} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `📌 Basic Pay: ${formatNumber(basicPay)} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `📌 Allowances: ${formatNumber(totalAllowance)} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `💵 Gross Payable: ${formatNumber(totalGross)} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `🔻 SSC (Employee) Deduction: ${formatNumber(sscEmployee)} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `📊 Taxable Amount: ${formatNumber(totalGross - sscEmployee)} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `💳 PAYE: ${formatNumber(pay)} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `🧾 Total Deductions: ${formatNumber(sscEmployee + pay)} ${currencyType === "usd" ? "USD" : "TZS"}\n`;
    message += `💰 Net Salary: *${formatNumber(netPay)}* ${currencyType === "usd" ? "USD" : "TZS"}\n\n`;
    message += `Shared via Salary Calculator`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Format large numbers
  const formatLargeNumber = (num) => {
    if (!num) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div>
      <title>Job Salary Estimator</title>
      <Container>
        <div
          style={{
            maxWidth: "750px",
            margin: "0 auto",
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Header */}
          <div className="result-section mb-7  border-b border-black">
            <div
              className="result-detail"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <div>
                <a href="/home">
                  <img height="45px" width="45" src="/logo.png" alt="eKazi" />
                </a>
              </div>
              <h4
                style={{
                  color: "#D36314",
                  margin: 0,
                  fontSize: "15px",
                  alignItems: "center",
                }}
              >
                SALARY CALCULATOR
              </h4>
            </div>
          </div>

          {/* Form */}
          <Form style={{ fontSize: "13px" }}>
            {/* Currency Type */}
            <Form.Group
              className="form-group-one"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "3px",
              }}
            >
              <Form.Label style={{ flex: 1, fontWeight: 600 }}>
                Select Currency
              </Form.Label>
              <Form.Select
                style={{
                  flex: 2,
                  padding: "6px 8px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "13px",
                }}
                value={currencyType}
                onChange={(e) => setCurrencyType(e.target.value)}
              >
                <option value="" disabled>
                  Select Currency
                </option>
                <option value="tz">Tanzania (TZS)</option>
                <option value="usd">USD</option>
              </Form.Select>
            </Form.Group>

            {/* Exchange Rate */}
            {currencyType === "usd" && (
              <Form.Group
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "3px",
                }}
              >
                <Form.Label style={{ flex: 1, fontWeight: 600 }}>
                  Exchange Rate (USD to TZS)
                </Form.Label>
                <Form.Control
                  type="number"
                  style={{
                    flex: 2,
                    padding: "6px 8px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "13px",
                  }}
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(e.target.value)}
                  placeholder="Enter Rate"
                  min="1"
                  step="any"
                />
              </Form.Group>
            )}

            {/* Salary Type */}
            <Form.Group
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "3px",
              }}
            >
              <Form.Label style={{ flex: 1, fontWeight: 600 }}>
                Salary Type
              </Form.Label>

              <Form.Select
                style={{
                  flex: 2,
                  padding: "6px 8px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "13px",
                }}
                value={salaryType}
                onChange={async (e) => {
                  setSalaryType(e.target.value);
                  try {
                    const response = await CalculatorApi.createinsight();
                    const fetchData = async () => {
                      try {
                        const response = await CalculatorApi.getsalaryrate();
                        setTaxData(response.tax_rate);
                        setUsageCount(response.insight);
                        console.log("salary estimation data", response);
                      } catch (error) {}
                    };
                    fetchData();
                    console.log("Incremented value:", response);
                  } catch (error) {
                    console.error("Error incrementing value:", error);
                  }
                }}
              >
                <option value="" disabled>
                  Choose Salary Type
                </option>
                <option value="net">Gross Salary (From Net)</option>
                <option value="gross">Net Salary (From Gross)</option>
              </Form.Select>
            </Form.Group>

            {/* Salary Input */}
            <Form.Group
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "3px",
              }}
            >
              <Form.Label style={{ flex: 1, fontWeight: 600 }}>
                {salaryType === "net" ? "Net Salary" : "Basic Salary"} (
                {currencyType === "usd" ? "USD" : "TZS"})
              </Form.Label>
              <Form.Control
                type="number"
                style={{
                  flex: 2,
                  padding: "6px 8px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                }}
                value={salaryType === "net" ? netPay : basicPay}
                onChange={(e) =>
                  salaryType === "net"
                    ? setNetPay(
                        e.target.value > 100000000000 ? "" : e.target.value,
                      )
                    : setBasicPay(
                        e.target.value > 100000000000 ? "" : e.target.value,
                      )
                }
                placeholder={`Enter ${salaryType === "net" ? "Net" : "Basic"} Salary`}
                min="1"
                max="100000000000"
                disabled={currencyType === "usd" && !exchangeRate}
              />
            </Form.Group>

            {/* Allowances */}
            <Form.Group>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <Button
                  type="button"
                  onClick={addAllowance}
                  className="button-tax"
                  style={{
                    backgroundColor: "#D36314",
                    color: "white",
                    padding: "4px 10px",
                    fontSize: "12px",
                    border: "none",
                    borderRadius: "6px",
                  }}
                >
                  + Add Allowance
                </Button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginBottom: "5px",
                }}
              >
                {allowances.map((allowance, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  >
                    <Form.Control
                      type="number"
                      value={allowance}
                      onChange={(e) =>
                        handleAllowanceChange(index, e.target.value)
                      }
                      placeholder="Allowance amount"
                      min="1"
                      max="1000000000"
                      style={{
                        flex: 1,
                        padding: "6px 8px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => removeAllowance(index)}
                      style={{
                        backgroundColor: "#D36314",
                        color: "white",
                        padding: "2px 6px",
                        fontSize: "10px",
                        border: "none",
                        borderRadius: "4px",
                        lineHeight: 1,
                      }}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            </Form.Group>

            {/* Divider */}
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#ccc",
                margin: "10px 0",
              }}
            />
          </Form>

          {/* Results */}
          <div id="result" className="relative w-full p-2 text-center bg-white">
            {/* Header */}
            {/* <div className="result-section mb-7  border-b border-black">
                            <div className="result-detail" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                <div>
                                    <a href="/home">
                                        <img height="45px" width="45" src="/logo.png" alt="eKazi" />
                                    </a>
                                </div>
                                <h4 style={{ color: '#D36314', margin: 0, fontSize: '15px', alignItems: 'center' }}>
                                    SALARY CALCULATOR
                                </h4>
                            </div>
                        </div> */}
            {/* Salary Type Result */}
            <div className="result-section mb-2">
              <div className="result-detail flex justify-end items-center">
                <div className="text-right">
                  <h4 className="text-[14px] md:text-[16px] text-blue-600 m-0">
                    {salaryType === "net" ? "Gross Salary" : "Net Salary"} ={" "}
                    {formatNumber(
                      salaryType === "net"
                        ? parseFloat(totalGross || 0)
                        : parseFloat(netPay || 0),
                    )}{" "}
                    {currencyType === "usd" ? "USD" : "TZS"}
                  </h4>
                </div>
              </div>
            </div>

            {/* Earnings Section */}
            <div className="result-section mb-1.5">
              <div className="result-detail full-line flex justify-between w-full border-t border-b border-black py-1 font-bold text-[12px] md:text-[14px]">
                <h4 className="m-0 text-[15px] md:text-[16px]">EARNING</h4>
                <span>AMOUNT</span>
              </div>
              <div className="result-detail flex justify-between text-[12px] md:text-[14px]">
                <span>Basic</span>
                <span>
                  {formatNumber(parseFloat(basicPay || 0))}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
              <div className="result-detail flex justify-between text-[12px] md:text-[14px]">
                <span>Total Allowances</span>
                <span>
                  {formatNumber(parseFloat(totalAllowance || 0))}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
            </div>

            {/* Gross Earnings */}
            <div className="result-section mb-1.5">
              <div className="result-detail flex justify-between text-[12px] md:text-[14px]">
                <h4 className="font-bold text-[12px] md:text-[14px] m-0">
                  Gross Earning
                </h4>
                <span>
                  {formatNumber(parseFloat(totalGross || 0))}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
            </div>

            {/* Deductions */}
            <div className="result-section mb-1.5">
              <div className="result-detail full-line flex justify-between w-full border-t border-b border-black py-1 font-bold text-[12px] md:text-[14px]">
                <h4 className="m-0 text-[15px] md:text-[16px]">DEDUCTIONS</h4>
                <span>AMOUNT</span>
              </div>
              <div className="result-detail flex justify-between text-[12px] md:text-[14px]">
                <span>SSC (Employee)</span>
                <span>
                  {formatNumber(parseFloat(sscEmployee || 0))}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
              <div className="result-detail flex justify-between text-[12px] md:text-[14px]">
                <span>PAYE</span>
                <span>
                  {formatNumber(parseFloat(pay || 0))}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
            </div>

            {/* Total Deductions */}
            <div className="result-section mb-1.5">
              <div className="result-detail full-line flex justify-between w-full border-t border-b-2 border-black border-dotted py-1 font-bold text-[12px] md:text-[14px]">
                <h4 className="m-0 text-[15px] md:text-[16px]">
                  TOTAL DEDUCTIONS
                </h4>
                <span>
                  {formatNumber(
                    parseFloat(sscEmployee || 0) + parseFloat(pay || 0),
                  )}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
            </div>

            {/* Net Salary */}
            <div className="result-section mb-1.5">
              <div className="result-detail full-line flex justify-between w-full border-t-2 border-b-[3px] border-black border-double py-1 font-bold text-[12px] md:text-[14px]">
                <h4 className="m-0 text-[15px] md:text-[16px]">
                  NET PAY{" "}
                  <span className="font-normal text-[14px] md:text-[16px]">
                    (Gross Earnings - Total Deductions)
                  </span>
                </h4>
                <span>
                  {formatNumber(parseFloat(netPay || 0))}{" "}
                  {currencyType === "usd" ? "USD" : "TZS"}
                </span>
              </div>
            </div>

            {/* Company Cost Section */}
            {showCompanyCost && (
              <>
                <div className="result-section mb-1.5 mt-4">
                  <div className="result-detail full-line flex justify-between w-full border-t border-b border-black py-1 font-bold text-[12px] md:text-[14px]">
                    <h4 className="m-0 text-[15px] md:text-[16px]">
                      {" "}
                      TOTOAL COST TO COMPANY{" "}
                    </h4>
                    <span>AMOUNT</span>
                  </div>
                  <div className="result-detail flex justify-between text-[12px] md:text-[14px]">
                    <span>Gross Salary</span>
                    <span>
                      {formatNumber(calculateCompanyCost()?.grossSalary)}{" "}
                      {currencyType === "usd" ? "USD" : "TZS"}
                    </span>
                  </div>
                  <div className="result-detail flex justify-between text-[12px] md:text-[14px]">
                    <span>SSC (Employer)</span>
                    <span>
                      {formatNumber(calculateCompanyCost()?.employerSSC)}{" "}
                      {currencyType === "usd" ? "USD" : "TZS"}
                    </span>
                  </div>
                  <div className="result-detail flex justify-between text-[12px] md:text-[14px]">
                    <span>SDL (3.5%)</span>
                    <span>
                      {formatNumber(calculateCompanyCost()?.sdl)}{" "}
                      {currencyType === "usd" ? "USD" : "TZS"}
                    </span>
                  </div>
                  <div className="result-detail flex justify-between text-[12px] md:text-[14px]">
                    <span>WCF (0.5%)</span>
                    <span>
                      {formatNumber(calculateCompanyCost()?.wcf)}{" "}
                      {currencyType === "usd" ? "USD" : "TZS"}
                    </span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="result-section mb-1.5">
                  <div className="result-detail full-line flex justify-between w-full border-t-2 border-b-[3px] border-black border-double py-1 font-bold text-[12px] md:text-[14px]">
                    <h4 className="m-0 text-[15px] md:text-[16px]">
                      GRAND TOTAL
                    </h4>
                    <span>
                      {formatNumber(calculateCompanyCost()?.grandTotal)}{" "}
                      {currencyType === "usd" ? "USD" : "TZS"}
                    </span>
                  </div>
                </div>
              </>
            )}

            <p className="text-center text-[11px] md:text-[13px] my-1">
              - salary calculation generated - by eKazi
            </p>
          </div>
          {/* Company Cost Button */}
          <div className="result-section mb-1.5 no-print">
            <button
              onClick={() => setShowCompanyCost(!showCompanyCost)}
              className="flex items-center justify-center w-full py-2 bg-gray-100 hover:bg-gray-200 text-[14px] md:text-[16px] font-bold gap-2"
            >
              {showCompanyCost ? (
                <>
                  <span>Hide Total Cost To Company</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <span>Show Total Cost To Company</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div
            className="result-detail"
            style={{
              padding: "10px",
              borderRadius: "5px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* Top Row: User Icon Left, Count Right */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h4 style={{ fontWeight: "bold", margin: 0 }}>
                <FaCalculator style={{ color: "#D36314", fontSize: "14px" }} />
              </h4>

              <p
                style={{
                  margin: 0,
                  color: "#D36314",
                  fontSize: "18px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <FaUser style={{ color: "#D36314", fontSize: "14px" }} />
                <span style={{ color: "#007bff" }}>
                  {formatLargeNumber(usageCount.no_uses)}
                </span>
              </p>
            </div>

            {/* Button Row */}
            <div
              style={{
                display: "flex",
                gap: "5px",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Button
                onClick={downloadPDF}
                className="button-tax"
                style={{
                  backgroundColor: "#D36314",
                  width: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                }}
              >
                Download
              </Button>

              <Button
                id="whatsapp-share"
                onClick={shareOnWhatsApp}
                className="button-tax"
                style={{
                  backgroundColor: "#D36314",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "10px",
                }}
              >
                <FaWhatsapp /> Share on WhatsApp
              </Button>

              <Button
                className="button-tax"
                onClick={() => setShowTaxModal(true)}
                style={{
                  backgroundColor: "#D36314",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "10px",
                }}
              >
                <FaEye /> Tax Rates
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Tax Rate Modal */}
      <Modal
        show={showTaxModal}
        onHide={() => setShowTaxModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tanzania Tax Rates & Deductions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="fw-bold">Tanzania PAYE (Personal Income Tax) Table</h6>
          <Table bordered className="text-center">
            <thead className="table-dark">
              <tr>
                <th>Monthly Income (TZS)</th>
                <th>Annual Income (TZS)</th>
                <th>Tax Rate</th>
                <th>Addition Amount (TZS)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0 - {taxData.payone_reduction?.toLocaleString()}</td>
                <td>0 - {(taxData.payone_reduction * 12)?.toLocaleString()}</td>
                <td>0%</td>
                <td>0</td>
              </tr>
              <tr>
                <td>
                  {(taxData.payone_reduction + 1)?.toLocaleString()} -{" "}
                  {taxData.paytwo_reduction?.toLocaleString()}
                </td>
                <td>
                  {(taxData.payone_reduction * 12 + 1)?.toLocaleString()} -{" "}
                  {(taxData.paytwo_reduction * 12)?.toLocaleString()}
                </td>
                <td>{(taxData.payone_percentage * 100)?.toFixed(0)}%</td>
                <td>0</td>
              </tr>
              <tr>
                <td>
                  {(taxData.paytwo_reduction + 1)?.toLocaleString()} -{" "}
                  {taxData.paythree_reduction?.toLocaleString()}
                </td>
                <td>
                  {(taxData.paytwo_reduction * 12 + 1)?.toLocaleString()} -{" "}
                  {(taxData.paythree_reduction * 12)?.toLocaleString()}
                </td>
                <td>{(taxData.paytwo_percentage * 100)?.toFixed(0)}%</td>
                <td>{taxData.paytwo_addition?.toLocaleString()}</td>
              </tr>
              <tr>
                <td>
                  {(taxData.paythree_reduction + 1)?.toLocaleString()} -{" "}
                  {taxData.payfour_reduction?.toLocaleString()}
                </td>
                <td>
                  {(taxData.paythree_reduction * 12 + 1)?.toLocaleString()} -{" "}
                  {(taxData.payfour_reduction * 12)?.toLocaleString()}
                </td>
                <td>{(taxData.paythree_percentage * 100).toFixed(0)}%</td>
                <td>{taxData.paythree_addition?.toLocaleString()}</td>
              </tr>
              <tr>
                <td>
                  {(taxData.payfour_reduction + 1)?.toLocaleString()} and above
                </td>
                <td>
                  {(taxData.payfour_reduction * 12 + 1)?.toLocaleString()} and
                  above
                </td>
                <td>{(taxData.payfour_percentage * 100)?.toFixed(0)}%</td>
                <td>{taxData.payfour_addition?.toLocaleString()}</td>
              </tr>
            </tbody>
          </Table>

          <h6 className="fw-bold mt-4">
            {" "}
            <strong>Additional Deductions:</strong>
          </h6>
          <p>
            <strong>SSF (Social Security Fund):</strong> 20% of an employee's
            gross salary, where the employee contributes 10% of their salary,
            and the employer contributes 10% of the employee's gross salary to
            the Social Security Fund.
          </p>
          <p>
            <strong>WCF (Workers Compensation Fund):</strong> Employers
            contribute 0.5% of the employee's salary for workplace injury
            insurance.
          </p>
          <p>
            <strong> SDL (Skills Development Levy):</strong> is a tax imposed on
            employers to fund workforce training and skills development
            programs. The applicable rate for SDL is 3.5% of the total
            emoluments paid to all employees during the month. Employees include
            permanent employees, part-time employees, secondary employees,
            casual laborers, etc.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTaxModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SalaryEstimation;
