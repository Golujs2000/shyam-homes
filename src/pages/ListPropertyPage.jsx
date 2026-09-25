import React, { useState, useRef, useCallback } from "react";
import { Send, CheckCircle2, Phone, MessageCircle, Camera, Trash2, Home, TrendingUp, ShieldCheck, Clock, Star, Video, X, Upload, AlertCircle } from "lucide-react";
import { useAdminData } from "../context/AdminDataContext";
import { localities } from "../data/localities";
import { uploadMediaFile, deleteMediaFile, validateMediaFile, MEDIA_LIMITS } from "../services/storageService";

const formatBytes = (bytes) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function ListPropertyPage() {
  const { addListingRequest, settings } = useAdminData();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    propertyType: "House",
    locality: "Kankarbagh",
    area: "",
    expectedPrice: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Each item: { id, file, type, preview, status, progress, url, path, name, size, error }
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaErrors, setMediaErrors] = useState([]);
  const requestIdRef = useRef(`lr-${Date.now()}`);
  const fileInputRef = useRef(null);

  const uploadingCount = mediaItems.filter((m) => m.status === "uploading").length;
  const imageCount = mediaItems.filter((m) => m.type === "image").length;
  const videoCount = mediaItems.filter((m) => m.type === "video").length;
  const canAddImages = imageCount < MEDIA_LIMITS.MAX_IMAGES;
  const canAddVideos = videoCount < MEDIA_LIMITS.MAX_VIDEOS;

  const handleMediaSelect = useCallback(async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    e.target.value = "";

    const errors = [];
    const toUpload = [];

    for (const file of files) {
      const validationError = validateMediaFile(file);
      if (validationError) { errors.push(validationError); continue; }

      const isImage = MEDIA_LIMITS.ALLOWED_IMAGE_TYPES.includes(file.type);
      const curImages = mediaItems.filter((m) => m.type === "image").length + toUpload.filter((f) => MEDIA_LIMITS.ALLOWED_IMAGE_TYPES.includes(f.type)).length;
      const curVideos = mediaItems.filter((m) => m.type === "video").length + toUpload.filter((f) => !MEDIA_LIMITS.ALLOWED_IMAGE_TYPES.includes(f.type)).length;

      if (isImage && curImages >= MEDIA_LIMITS.MAX_IMAGES) { errors.push(`Max ${MEDIA_LIMITS.MAX_IMAGES} images. "${file.name}" skipped.`); continue; }
      if (!isImage && curVideos >= MEDIA_LIMITS.MAX_VIDEOS) { errors.push(`Max ${MEDIA_LIMITS.MAX_VIDEOS} videos. "${file.name}" skipped.`); continue; }
      toUpload.push(file);
    }

    setMediaErrors(errors);
    if (toUpload.length === 0) return;

    const newItems = toUpload.map((file) => {
      const isImage = MEDIA_LIMITS.ALLOWED_IMAGE_TYPES.includes(file.type);
      return {
        id: `media-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        type: isImage ? "image" : "video",
        preview: isImage ? URL.createObjectURL(file) : null,
        status: "uploading",
        progress: 0,
        url: null,
        path: null,
        name: file.name,
        size: file.size,
        error: null,
      };
    });

    setMediaItems((prev) => [...prev, ...newItems]);

    for (const item of newItems) {
      try {
        const result = await uploadMediaFile(item.file, requestIdRef.current, (percent) => {
          setMediaItems((prev) => prev.map((m) => m.id === item.id ? { ...m, progress: percent } : m));
        });
        setMediaItems((prev) => prev.map((m) => m.id === item.id ? { ...m, status: "done", progress: 100, url: result.url, path: result.path } : m));
      } catch (err) {
        setMediaItems((prev) => prev.map((m) => m.id === item.id ? { ...m, status: "error", error: err.message } : m));
      }
    }
  }, [mediaItems]);

  const handleRemoveMedia = useCallback(async (item) => {
    if (item.preview) URL.revokeObjectURL(item.preview);
    setMediaItems((prev) => prev.filter((m) => m.id !== item.id));
    if (item.path) deleteMediaFile(item.path).catch(console.warn);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadingCount > 0) return;
    setLoading(true);

    const doneMedia = mediaItems.filter((m) => m.status === "done");
    const imageUrls = doneMedia.filter((m) => m.type === "image").map((m) => m.url);
    const videoUrls = doneMedia.filter((m) => m.type === "video").map((m) => m.url);
    const mediaUrls = doneMedia.map((m) => m.url);

    await addListingRequest({
      name: formData.name,
      phone: formData.phone,
      propertyType: formData.propertyType,
      locality: formData.locality,
      area: formData.area,
      expectedPrice: formData.expectedPrice,
      message: formData.message,
      mediaUrls,
      imageUrls,
      videoUrls,
      mediaCount: doneMedia.length,
    });

    let msg =
      `*Property Listing Request - Shyam Homes*\n\n` +
      `*Owner:* ${formData.name}\n*Phone:* ${formData.phone}\n` +
      `*Type:* ${formData.propertyType}\n*Locality:* ${formData.locality}\n` +
      `*Area:* ${formData.area || "Not specified"}\n` +
      `*Price:* ${formData.expectedPrice || "Open to discussion"}\n` +
      `*Details:* ${formData.message || "I want to list my property on Shyam Homes"}`;

    if (imageUrls.length > 0) msg += `\n\n*Photos (${imageUrls.length}):*\n` + imageUrls.map((u, i) => `${i + 1}. ${u}`).join("\n");
    if (videoUrls.length > 0) msg += `\n\n*Videos (${videoUrls.length}):*\n` + videoUrls.map((u, i) => `${i + 1}. ${u}`).join("\n");

    window.open(`https://wa.me/91${settings.whatsapp || "7858832545"}?text=${encodeURIComponent(msg)}`, "_blank");
    setLoading(false);
    setSubmitted(true);
  };

  const benefits = [
    { icon: TrendingUp, title: "Maximum Exposure", desc: "Your property showcased to thousands of active buyers across Patna." },
    { icon: ShieldCheck, title: "Free Market Valuation", desc: "Get an accurate estimate based on local circle rates and comparable transactions." },
    { icon: Clock, title: "Fast Processing", desc: "Our team reviews your listing request within 24 hours." },
    { icon: Home, title: "Professional Handling", desc: "From site photos to documentation — we manage everything with full transparency." },
  ];

  return (
    <div className="pt-24 pb-20 bg-surface-light min-h-screen text-left">
      {/* Hero Banner */}
      <div className="relative overflow-hidden border-b border-lightblue-200 bg-gradient-to-br from-gunmetal-950 via-gunmetal-900 to-gunmetal-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,#ffc64f_0%,transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-400 text-xs font-bold uppercase tracking-wider mb-5">
            <Star className="w-3.5 h-3.5 fill-primary-400" /> Property Listing Portal
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-white max-w-3xl">
            List Your Property on <span className="text-primary-400 italic font-normal">Shyam Homes</span>
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            Submit your property details below. Our team reviews every request and connects you with genuine buyers across Patna.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-white/10">
            <a href="tel:7858832545" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-400 text-gunmetal-950 font-bold text-sm shadow-lg transition-all hover:-translate-y-0.5">
              <Phone className="w-4 h-4" /> <span>Call 7858832545 for Quick Listing</span>
            </a>
            <a href={`https://wa.me/917858832545?text=${encodeURIComponent("Hello Shyam Homes, I want to list my property.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors">
              <MessageCircle className="w-4 h-4 text-primary-400" /> <span>WhatsApp Us Directly</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-premium p-6 sm:p-10">
              <div className="mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gunmetal-900">Submit Your Property Details</h2>
                <p className="text-sm text-slate-500 mt-1.5">Our consultant will review your submission and contact you within 24 hours.</p>
              </div>

              {submitted ? (
                <div className="p-8 bg-primary-500/10 border border-primary-500/30 rounded-2xl text-center space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-primary-700 mx-auto" />
                  <h3 className="font-serif text-2xl font-bold text-gunmetal-900">Listing Request Received!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Dhananjay Kumar will contact you on <strong>{formData.phone}</strong> to confirm details and schedule a site visit.
                  </p>
                  {mediaItems.filter((m) => m.status === "done").length > 0 && (
                    <p className="text-xs text-slate-500">{mediaItems.filter((m) => m.status === "done").length} media file(s) uploaded and shared.</p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "", propertyType: "House", locality: "Kankarbagh", area: "", expectedPrice: "", message: "" }); setMediaItems([]); setMediaErrors([]); requestIdRef.current = `lr-${Date.now()}`; }} className="px-6 py-2.5 rounded-xl bg-gunmetal-900 text-primary-400 font-bold text-xs uppercase tracking-wider hover:bg-gunmetal-800 transition-colors">
                      List Another Property
                    </button>
                    <a href="/properties" className="px-6 py-2.5 rounded-xl bg-primary-500 text-gunmetal-950 font-bold text-xs uppercase tracking-wider hover:bg-primary-400 transition-colors">Browse Properties</a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Owner / Contact Name *</label>
                      <input type="text" required placeholder="e.g. Rajesh Kumar" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Phone / WhatsApp *</label>
                      <input type="tel" required placeholder="e.g. 9876543210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Property Type</label>
                      <select value={formData.propertyType} onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 cursor-pointer">
                        <option value="Plot">Residential Plot</option>
                        <option value="House">Independent House / Villa</option>
                        <option value="Flat">Apartment / Flat</option>
                        <option value="Commercial">Commercial Showroom / Shop</option>
                        <option value="Land">Commercial / Bulk Land</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Patna Locality</label>
                      <select value={formData.locality} onChange={(e) => setFormData({ ...formData, locality: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 cursor-pointer">
                        {localities.map((loc) => (<option key={loc.name} value={loc.name}>{loc.name}</option>))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Area (Sq.ft or Kattha)</label>
                      <input type="text" placeholder="e.g. 1,500 sq.ft or 1.5 Kattha" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Expected Selling Price</label>
                      <input type="text" placeholder="e.g. Rs. 65 Lakh" value={formData.expectedPrice} onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Property Description</label>
                    <textarea rows={4} placeholder="Floor details, road width, age of property, facing, clear title status, any unique features..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-gunmetal-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none" />
                  </div>

                  {/* Media Upload */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                        Photos &amp; Videos <span className="text-slate-400 font-normal normal-case">(Optional)</span>
                      </label>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><Camera className="w-3.5 h-3.5" />{imageCount}/{MEDIA_LIMITS.MAX_IMAGES} photos</span>
                        <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" />{videoCount}/{MEDIA_LIMITS.MAX_VIDEOS} videos</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      Images up to <strong>{MEDIA_LIMITS.IMAGE_MAX_MB} MB</strong> (JPG, PNG, WebP) &nbsp;·&nbsp; Videos up to <strong>{MEDIA_LIMITS.VIDEO_MAX_MB} MB</strong> (MP4, MOV)
                    </p>

                    {(canAddImages || canAddVideos) && (
                      <label className="border-2 border-dashed border-slate-300 hover:border-primary-400 bg-slate-50 hover:bg-primary-50/20 rounded-2xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 block">
                        <input ref={fileInputRef} type="file" multiple accept={[...MEDIA_LIMITS.ALLOWED_IMAGE_TYPES, ...MEDIA_LIMITS.ALLOWED_VIDEO_TYPES].join(",")} onChange={handleMediaSelect} className="hidden" />
                        <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-700 flex items-center justify-center">
                          <Upload className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-gunmetal-900">Click to upload photos &amp; videos</p>
                        <p className="text-[10px] text-slate-500">Exterior, rooms, road view, walkthrough video — select multiple files</p>
                      </label>
                    )}

                    {mediaErrors.length > 0 && (
                      <div className="space-y-1.5">
                        {mediaErrors.map((err, i) => (
                          <div key={i} className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span className="flex-1">{err}</span>
                            <button type="button" onClick={() => setMediaErrors((prev) => prev.filter((_, j) => j !== i))}><X className="w-3.5 h-3.5" /></button>
                          </div>
                        ))}
                      </div>
                    )}

                    {mediaItems.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                        {mediaItems.map((item) => (
                          <div key={item.id} className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group" style={{ aspectRatio: "4/3" }}>
                            {item.type === "image" && item.preview ? (
                              <img src={item.preview} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-gunmetal-900/90 text-white p-2">
                                <Video className="w-6 h-6 text-primary-400" />
                                <span className="text-[10px] text-center leading-tight truncate w-full px-1">{item.name}</span>
                                <span className="text-[10px] text-slate-400">{formatBytes(item.size)}</span>
                              </div>
                            )}

                            {item.status === "uploading" && (
                              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1.5 p-2">
                                <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                                  <div className="bg-primary-400 h-full rounded-full transition-all duration-300" style={{ width: `${item.progress}%` }} />
                                </div>
                                <span className="text-white text-[10px] font-bold">{item.progress}%</span>
                              </div>
                            )}

                            {item.status === "error" && (
                              <div className="absolute inset-0 bg-rose-900/80 flex flex-col items-center justify-center gap-1 p-2">
                                <AlertCircle className="w-5 h-5 text-white" />
                                <span className="text-white text-[10px] text-center leading-tight">{item.error}</span>
                              </div>
                            )}

                            {item.status === "done" && (
                              <div className="absolute top-1.5 left-1.5 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              </div>
                            )}

                            <button type="button" onClick={() => handleRemoveMedia(item)} className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500 shadow" title="Remove">
                              <X className="w-3.5 h-3.5" />
                            </button>

                            {item.status !== "uploading" && item.type === "image" && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[9px] px-1.5 py-0.5 text-center">{formatBytes(item.size)}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {uploadingCount > 0 && (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                        <span>Uploading {uploadingCount} file{uploadingCount > 1 ? "s" : ""}... please wait before submitting</span>
                      </div>
                    )}
                  </div>

                  <button type="submit" disabled={loading || uploadingCount > 0} className="w-full inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-400 text-gunmetal-950 font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-primary-glow hover:-translate-y-0.5 active:translate-y-0 text-sm uppercase tracking-wider disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-gunmetal-950 border-t-transparent rounded-full animate-spin" /><span>Submitting...</span></>
                    ) : uploadingCount > 0 ? (
                      <><div className="w-4 h-4 border-2 border-gunmetal-950 border-t-transparent rounded-full animate-spin" /><span>Waiting for uploads...</span></>
                    ) : (
                      <><Send className="w-4 h-4" /><span>Submit Listing Request</span></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gunmetal-900 text-white p-8 rounded-3xl border border-gunmetal-800 space-y-5 shadow-xl">
              <div>
                <div className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-1">Why Choose Shyam Homes?</div>
                <h3 className="font-serif text-xl font-bold text-white">Get Your Property Sold Faster</h3>
              </div>
              <div className="space-y-4">
                {benefits.map((b) => { const Icon = b.icon; return (
                  <div key={b.title} className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center shrink-0"><Icon className="w-5 h-5" /></div>
                    <div><h4 className="font-bold text-sm text-white">{b.title}</h4><p className="text-xs text-slate-300 mt-0.5">{b.desc}</p></div>
                  </div>
                ); })}
              </div>
              <div className="pt-4 border-t border-gunmetal-800">
                <div className="text-xs text-slate-400 uppercase tracking-widest">Listing Consultant</div>
                <div className="text-lg font-serif font-bold text-primary-400 mt-1">Dhananjay Kumar</div>
                <div className="text-xs text-slate-300 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" />7858832545 - Patna, Bihar</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 space-y-3 shadow-sm">
              <h4 className="font-serif text-lg font-bold text-gunmetal-900">How Listing Works</h4>
              <ol className="space-y-3 text-xs sm:text-sm text-slate-600">
                {["Submit your property details via form or WhatsApp", "Our team contacts you within 24 hours for verification", "We visit the site, take professional photos, and prepare the listing", "Your property goes live on Shyam Homes and reaches active buyers"].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-gunmetal-900 text-primary-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-primary-500/10 border border-primary-500/30 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 font-bold text-gunmetal-900 text-sm"><Camera className="w-4 h-4 text-primary-700" />Media Upload Limits</div>
              <ul className="text-xs text-slate-600 space-y-1 pl-1">
                <li>Up to <strong>8 photos</strong> (JPG, PNG, WebP) max 10 MB each</li>
                <li>Up to <strong>2 videos</strong> (MP4, MOV) max 50 MB each</li>
                <li>Files securely hosted on Firebase Storage</li>
                <li>Direct links sent to our consultant via WhatsApp</li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-500 text-gunmetal-950 flex items-center justify-center shrink-0 shadow-primary-glow"><ShieldCheck className="w-6 h-6" /></div>
              <div>
                <div className="font-bold text-gunmetal-900 text-sm">Free Listing, Zero Hassle</div>
                <p className="text-xs text-slate-600 mt-0.5">No upfront costs. We charge only a nominal brokerage upon successful sale or rent.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
