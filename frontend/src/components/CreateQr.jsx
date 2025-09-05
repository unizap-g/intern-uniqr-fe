import React, { useState, useEffect } from "react";
import CompleteComp from "./MyQr/CompleteComp";
import MobileWireframe from "./MyQr/DeviceWireframe";
import ContentInput from "./MyQr/ContentInput";
import { ImageUp } from "lucide-react";
import QrCard from "./MyQr/QrCard";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import { Check } from "lucide-react";

import { Gem } from "lucide-react";
const CreateQr = () => {
  const BASEURL = import.meta.env.VITE_API_URL;
  const [step, setStep] = useState(1);
  const [qrTypes, setQrTypes] = useState([
    {
      qrType: "static",
      qrName: "URL",
      subtitle: "Opens a specific webpage",
    },
    {
      qrType: "dynamic",
      qrName: "vCard",
      subtitle: "Saves contact information",
    },
    {
      qrType: "static",
      qrName: "WiFi",
      subtitle: "Connects to WiFi network",
    },
    {
      qrType: "dynamic",
      qrName: "PDF",
      subtitle: "Downloads a product brochure",
    },
  ]);
  const navigate = useNavigate();
  const [qrShapes, setQrShapes] = useState([]);
  const [qrLogos, setQrLogos] = useState([]);
  const [selectedShape, setSelectedShape] = useState(1);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [customLogo, setCustomLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [qrImg, setQrImg] = useState("");
  const [createdQr, setCreatedQr] = useState(null);
  const [qrCodeName, setQrCodeName] = useState("MY QR CODE");
  const [qrCodeWarning, setQrCodeWarning] = useState("");

  const [Url, setUrl] = useState("");
  const [UrlWarning, setUrlWarning] = useState("");

  const [iscompleteModelOpen, setiscompletemodelopen] = useState(false);
  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await axios.get(
          "http://10.1.3.91:1031/mock/5/api/qrtyles?env=dev"
        );
        setQrTypes(res.data.qrCodes);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchShape = async () => {
      try {
        const res = await axios.get(`${BASEURL}/qr/getshape`,{
          headers: {
            "x-api-key": localStorage.getItem("uuidApiKey") || ""
          }
        });
        console.log(res.data);
        setSelectedShape(res.data[0]._id);
        setQrShapes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchQr = async () => {
      try {
        const res = await axios.get(
          "http://10.1.3.91:1031/mock/5/api/qrbase?env=dev"
        );
        setQrImg(res.data[0].basecode);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchLogo = async () => {
      try {
        const res = await axios.get(`${BASEURL}/qr/getlogo`);
        // console.log(res.data)
        setQrLogos(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    FetchData();
    fetchShape();
    // fetchQr();
    fetchLogo();
  }, []);
  const changeStep = () => {
    setStep(step + 1);
    console.log(step);
  };



//   function formatUrl(url) {
//   // Trim spaces
//   url = url.trim();

//   // If missing protocol, add https://
//   if (!/^https?:\/\//i.test(url)) {
//     url = "https://" + url;
//   }

//   // Now create a URL object to normalize
//   const urlObj = new URL(url);

//   // Ensure "www." exists at start of hostname
//   if (!urlObj.hostname.startsWith("www.")) {
//     urlObj.hostname = "www." + urlObj.hostname;
//   }

//   return urlObj.href;
// }









  useEffect(() => {
    // const formattedUrl = formatUrl(Url);
    const generateQr = async () => {
      // console.log("Generating QR with URL:", formattedUrl);
      const logoUrl =
        qrLogos.find((logo) => logo._id === selectedLogo)?.logoUrl || "";
      const shape =
        qrShapes.find((shape) => shape._id === selectedShape)?.shapeName || "";

      // const payload = {
      //   QRType: "URL",
      //   QRState: "static",
      //   QRName: qrCodeName || "My QR Code",
      //   Charge: "Free",
      //   BasicInfo: [
      //     {
      //       website: Url,
      //     },
      //   ],
      //   Configuration: [],
      //   Appearance: [],
      //   Shape: ["hexagon"],
      //   Logo: "",
      //   Status: "active",
      // };

      const payload = {
        QRType: "URL",
        QRState: "static",
        QRName: qrCodeName || "My QR Code",
        Charge: "Free",
        BasicInfo: [
          {
            website: `https://${Url}`,
          },
        ],
        Configuration: [],
        Appearance: [],
        Shape: [shape],
        Logo: logoUrl,
        Status: "active",
        CreatedAt: "",
        UpdatedAt: "",
        userId: localStorage.getItem("userId") || "",
        // userId: "68b8cbaf608d40ab8a49c36e",
      };
      try {
        const res = await axios.post(`${BASEURL}/qr/createQr`, payload,{
          headers: {
            "x-api-key": localStorage.getItem("uuidApiKey") || ""
          }

        });
        if(res.status===401){
          localStorage.removeItem("uuidApiKey");
          window.location.href="/";
        }
        console.log("sam", res.data);
        setCreatedQr(res.data);
        setQrImg(res.data.img);
      } catch (error) {
        console.error(error);
      }
    };
    if (step === 3) {
      generateQr();
    }
  }, [step, selectedLogo, selectedShape]);
  const uploadLogo = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setCustomLogo(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      const formData = new FormData();
      formData.append("image", selectedFile);

      //     try {
      //   const res = await axios.post("http://localhost:5000/upload", formData, {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   });
      //   alert("Image uploaded successfully!");
      //   console.log(res.data);
      // } catch (err) {
      //   console.error(err);
      //   alert("Upload failed!");
      // }
    } else {
      alert("Please select a valid image file");
    }
  };

  const handleSaveQr = async () => {
    if (!Url) {
      setUrlWarning("Please enter a valid URL");
      return;
    }
    const logoUrl =
      qrLogos.find((logo) => logo._id === selectedLogo)?.logoUrl || "";
    const shape =
      qrShapes.find((shape) => shape._id === selectedShape)?.shapeName || "";
    
    const payload = {
      QRType: "URL",
      QRState: "static",
      QRName: qrCodeName || "My QR Code",
      Charge: "Free",
      BasicInfo: [
        {
          website: `https://${Url}`,
        },
      ],
      Configuration: [],
      Appearance: [],
      Shape: [shape],
      Logo: logoUrl,
      Status: "active",
      CreatedAt: "",
      UpdatedAt: "",
      img: createdQr?.img || "",
      name: "scan",
      // userId: localStorage.getItem("userId") || "",
    };
    try {
      const res = await axios.post(`${BASEURL}/qr/saveQr`, payload,{
        headers: {
          "x-api-key": localStorage.getItem("uuidApiKey") || ""
        }
      });
      if(res.status===201){
        
        setiscompletemodelopen(true);
      }
      if(res.status===401){
        localStorage.removeItem("uuidApiKey");
        window.location.href="/";
      }
    } catch (error) {
      console.error(error);
    }
  };
  const verifyURLAndUpdate = (e) => {
    const urlRegex = /^(https:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.(com|net|org|in|co\.in|com\.in|net\.in|org\.in))([\/?#].*)?$/;
    if (urlRegex.test(e.target.value) || e.target.value === "") {
      setUrlWarning("");
    } else {
      setUrlWarning("Please enter a valid URL");
    }
    setUrl(e.target.value);
  };
  return (
    <div className="h-full flex flex-col justify-between bg-blue-50 w-full">
      <CompleteComp
        url={Url}
        baseQr={qrImg}
        isOpen={iscompleteModelOpen}
        onClose={() => {
          setiscompletemodelopen(false);
        }}
        onPay={() => {}}
      />
      <div className=" px-4 h-[5%]">
        <h1 className="font-bold text-gray-600 text-[20px] mb-4">
          {step === 1
            ? "Choose QR code Type"
            : step === 2
            ? "Add content"
            : "Customize QR design"}
        </h1>
      </div>
      {/* topComponent     */}
      <div className="w-full h-[85%] flex">
        {/* QR details */}
        {step == 1 && (
          <div className="h-full no-scrollbar p-4 w-[65%] overflow-y-scroll">
            {/* static */}
            <div className="mb-4">
              {qrTypes.length > 0 && (
                <div>
                  <h1 className="font-medium text-md mb-4">Static QR</h1>
                </div>
              )}
              <div className="  grid grid-cols-1 sm:grid-cols-2 gap-4">
                {qrTypes
                  .filter((qr) => qr.qrType === "static")
                  .map((qr) => (
                    <QrCard
                      onclick={changeStep}
                      key={qr.id}
                      title={qr.qrName}
                      subtitle={qr.subtitle}
                    />
                  ))}
              </div>
            </div>
            <div className="mb-4">
              {qrTypes.length > 0 && (
                <div>
                  <h1 className="font-medium text-md mb-4">Dynamic QR</h1>
                </div>
              )}
              <div className="  grid grid-cols-1 sm:grid-cols-2 gap-4">
                {qrTypes
                  .filter((qr) => qr.qrType === "dynamic")
                  .map((qr) => (
                    <QrCard
                      key={qr.id}
                      title={qr.qrName}
                      subtitle={qr.subtitle}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
        {step == 2 && (
          <div className=" h-full w-[65%] overflow-y-scroll no-scrollbar px-4">
            {/* input fields */}

            {/* maincontent component */}
            <div>
              <div className="shadow shadow-lg mb-5 bg-white p-5 rounded-lg">
                <div className="mb-5">
                  <h1 className="font-bold text-lg mb-2">QR Code Name</h1>
                </div>
                <div>
                  <input
                    type="text"
                    maxLength={20}
                    value={qrCodeName}
                    className="border border-gray-300 outline-none rounded-md p-3 text-lg w-full"
                    placeholder="Enter QR code name"
                    onChange={(e) => {
                      setQrCodeName(e.target.value);
                      setQrCodeWarning(""); 
                    }}
                  />
                  {qrCodeWarning && (
                    <p className="text-red-500 text-sm px-2 mt-1">
                      {qrCodeWarning}
                    </p>
                  )}
                </div>
              </div>

              {/* basic info */}
              <div className="shadow shadow-lg mb-5 bg-white p-5 rounded-lg">
                <div className="mb-5">
                  <h1 className="font-bold text-lg mb-2">Basic Information</h1>
                </div>
                <div>
                  <h1 className="mb-2 font-medium text-gray-500 text-sm">
                    Website URL *
                  </h1>
                  <input
                    type="text"
                    value={Url}
                    onChange={verifyURLAndUpdate}
                    className="border border-gray-300 outline-none rounded-md p-3 text-lg w-full"
                    placeholder="www.mywebsite.com"
                  />
                  {UrlWarning && (
                    <p className="text-red-500 text-sm px-2 mt-1">
                      {UrlWarning}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* maincontent component */}

            {/* basic info */}

            {/* input fields */}
          </div>
        )}
        {step == 3 && (
          <div className=" h-full w-[65%] overflow-y-scroll no-scrollbar px-4">
            <div className="shadow shadow-lg mb-5 bg-white p-5 rounded-lg">
              <div className="mb-5">
                <h1 className="font-bold text-lg mb-2">Select Shape</h1>
              </div>
              <div>
                <h1 className="mb-2 font-medium text-gray-500 text-sm">
                  Custom Shape
                </h1>
                {/* shapes */}
                <div className="  grid grid-cols-1 sm:grid-cols-6 gap-5">
                  {qrShapes.map((shape) => (
                    <div
                      key={shape._id}
                      onClick={() => {
                        if (shape.type === "free") {
                          setSelectedShape(shape._id);
                        }
                      }}
                      className="border relative active:scale-98 cursor-pointer shadow shadow-lg border-gray-200 p-3 rounded-2xl mb-2"
                    >
                      {selectedShape === shape._id && (
                        <div className="absolute top-[-10px] bg-green-400 rounded-full p-1 right-[-10px]">
                          <Check size={15} color="white" />
                        </div>
                      )}
                      <img src={shape.shapeUrl} alt="" />
                      <div
                        className={`flex gap-2 justify-center items-center absolute bottom-[-12px] border-1 left-[50%] text-center font-bold capitalize transform translate-x-[-50%] text-sm  px-3 rounded-2xl ${
                          shape.type == "free"
                            ? "bg-green-100 border-green-500 text-green-600"
                            : shape.type == "paid"
                            ? "bg-orange-100 border-orange-500 text-orange-600"
                            : ""
                        }`}
                      >
                        <Gem size={15} />
                        {shape.type == "free"
                          ? "Free"
                          : shape.type == "paid"
                          ? shape.point
                          : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* add logo */}
            <div className="shadow shadow-lg mb-5 bg-white p-5 rounded-lg">
              <div className="mb-5">
                <h1 className="font-bold text-lg mb-2">Add logo</h1>
              </div>
              <div>
                <h1 className="mb-2 font-medium text-gray-500 text-sm">
                  Select logo
                </h1>
                {/* logos */}
                <div className="  mt-5 grid grid-cols-1 sm:grid-cols-10 gap-5">
                  {qrLogos.map((logo) => (
                    <div
                      key={logo._id}
                      onClick={() =>
                        selectedLogo === logo._id
                          ? setSelectedLogo(null)
                          : setSelectedLogo(logo._id)
                      }
                      className="border relative active:scale-98 cursor-pointer shadow shadow-lg border-gray-200 p-3 rounded-2xl mb-2"
                    >
                      {selectedLogo === logo._id && (
                        <div className="absolute top-[-10px] bg-green-400 rounded-full p-1 right-[-10px]">
                          <Check size={15} color="white" />
                        </div>
                      )}
                      <img src={logo.logoUrl} alt="" />
                    </div>
                  ))}
                </div>
              </div>
              {/* ------------------------------------- */}
              <div className="mt-5 flex justify-center items-center gap-5 mb-5">
                <div className="w-full h-[1px] bg-gray-200"></div>
                <h1 className="text-gray-400 font-medium">or</h1>
                <div className="w-full h-[1px] bg-gray-200"></div>
              </div>
              <div>
                <h1 className="mb-2  font-medium text-gray-500 text-sm">
                  Upload your own logo
                </h1>
                {/* logos */}
                <div className="mt-5 relative  bg-gray-100 border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-500 duration-300 ease-in-out text-white flex flex-col justify-center items-center py-10 rounded-lg">
                  <input
                    className="absolute cursor-pointer text-gray-100 w-full h-full"
                    placeholder="sample.png"
                    type="file"
                    accept="image/*"
                    onChange={uploadLogo}
                  />
                  <div className="flex flex-col gap-3 justify-center items-center text-blue-500">
                    <ImageUp size={40} />
                    <p className="text-gray-600 text-sm font-bold ">
                      Upload image (PNG, JPG, SVG)
                    </p>
                    <p className="text-gray-600 text-xs">maximum size: 5 MB</p>
                  </div>

                  {preview && (
                    <img
                      src={preview}
                      alt="Logo Preview"
                      className="mt-5 w-12 h-12 border-1 object-contain border-gray-300 p-1"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* QR details */}

        {/* phone view */}
        <div className=" h-full px-10 w-[35%]">
          <MobileWireframe
            qrLink={qrImg}
            step={step}
            qrName={qrCodeName}
            url={Url}
          />
        </div>
        {/* phone view */}
      </div>
      {/* topComponent     */}

      {/* bottom Comp */}
      <div className=" px-15  flex justify-between items-center w-full h-[10%]">
        <div className="flex gap-3 justify-center items-center">
          <div className="flex gap-2 justify-center items-center">
            <div
              className={`w-7 h-7 rounded-full border-1 p-1 ${
                step === 1
                  ? "bg-blue-500 text-white"
                  : step > 1
                  ? "bg-green-500"
                  : ""
              }  border-gray-300 text-gray-500 flex items-center justify-center`}
            >
              {step > 1 ? <Check className="text-white" /> : 1}
            </div>
            <h1
              className={` ${
                step === 1
                  ? "text-blue-500"
                  : step > 1
                  ? "text-black"
                  : " text-gray-500"
              }  text-sm font-medium`}
            >
              QR Code Type
            </h1>
            <div className="text-gray-400 flex justify-center items-center w-6 h-6">
              <ChevronRight />
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <div
              className={`w-7 h-7 rounded-full border-1 p-1 ${
                step === 2
                  ? "bg-blue-500 text-white"
                  : step > 2
                  ? "bg-green-500"
                  : ""
              }  border-gray-300 text-gray-500 flex items-center justify-center`}
            >
              {step > 2 ? <Check className="text-white" /> : 2}
            </div>
            <h1
              className={` ${
                step === 2
                  ? "text-blue-500"
                  : step > 2
                  ? "text-black"
                  : " text-gray-500"
              }  text-sm font-medium`}
            >
              Content
            </h1>
            <div className="text-gray-400 flex justify-center items-center w-6 h-6">
              <ChevronRight />
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <div
              className={`w-7 h-7 rounded-full border-1 p-1 ${
                step === 3
                  ? "bg-blue-500 text-white"
                  : step > 3
                  ? "bg-green-500"
                  : ""
              }  border-gray-300 text-gray-500 flex items-center justify-center`}
            >
              {step > 3 ? <Check className="text-white" /> : 3}
            </div>
            <h1
              className={` ${
                step === 3
                  ? "text-blue-500"
                  : step > 3
                  ? "text-black"
                  : " text-gray-500"
              }  text-sm font-medium`}
            >
              QR Code Type
            </h1>
            <div className="text-gray-400 flex justify-center items-center w-6 h-6">
              <ChevronRight />
            </div>
          </div>
        </div>
        {step !== 1 && (
          <div className=" flex justify-between items-center gap-5">
            <div>
              <button
                onClick={() => setStep((prev) => prev - 1)}
                className="border-2 active:scale-98 cursor-pointer border-blue-900  text-blue-900 font-bold w-40  py-2 rounded-md"
              >
                Back
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  if (Url === "") {
                    setUrlWarning("Please enter a URL");
                  }
                  if(qrCodeName===""){
                    setQrCodeWarning("Please enter QR code name");
                    return
                  }

                  if (step < 3 && UrlWarning === "") {
                    setStep((prev) => prev + 1);
                  }
                  if (step === 3) {
                    handleSaveQr();
                  }
                }}
                className={`${
                  step < 3
                    ? "bg-blue-900 border-blue-900 "
                    : "bg-green-500 border-green-500"
                } cursor-pointer active:scale-98 text-white font-bold w-40 py-2 border-2 rounded-md`}
              >
                {step < 3 ? "Next" : "Complete"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* bottom Comp */}
    </div>
  );
};

export default CreateQr;