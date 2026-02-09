import React, { useState, useRef, useEffect } from "react";

const A4Paper = () => {
  const [pages, setPages] = useState([["Page 1","Page 1","Page 1"]]); // Initial content on first page
  const containerRef = useRef(null);
  const pageHeight = 200; // Height of each page in pixels

  useEffect(() => {
    const contentElements = containerRef.current.children;
    alert(contentElements.length)
    let currentPageContent = [];
    let currentPageHeight = 0;
    let newPages = [];

    // for (let i = 0; i < contentElements.length; i++) {
    //   const contentElement = contentElements[i];
    //   const contentHeight = contentElement.offsetHeight;

    //   if (currentPageHeight + contentHeight > pageHeight) {
    //     // Content exceeds current page height, start a new page
    //     newPages.push(currentPageContent);
    //     currentPageContent = [];
    //     currentPageHeight = 0;
    //   }

    //   currentPageContent.push(contentElement.textContent);
    //   currentPageHeight += contentHeight;
    // }

    // // Add remaining content to the last page
    // if (currentPageContent.length > 0) {
    //   newPages.push(currentPageContent);
    // }

    // setPages(newPages);
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen overflow-x-hidden flex justify-center items-center">
      <div className="w-7/12 bg-white min-h-screen overflow-x-hidden" ref={containerRef}>
        {pages.map((pageContent, index) => (
          <div key={index} className="">
            {pageContent.map((content, i) => (
              <div className=" border-b-8 border-slate-800 px-10 h-[200px]" key={i}>
                Watalii 40 na wafanyakazi kadhaa waliokolewa katika Hifadhi ya Masai Mara baada ya mto Talek kuvunja kingo zake na kufurika.
                Akizungumza na wanahabari katika hoteli ya Sarova Mara Lodge, Gavana wa Narok Patrick Ntutu alisema hakuna majeruhi wala vifo vilivyoripotiwa.
                Mafuriko yameathiri kambi tisa zikiwemo kambi ya Tipilikwani, kambi ya Mara Leisure, kambi ya Mara Base, kambi ya Olkinyei, kambi ya Mara Big Five, Mariot Camp, Sweet Acacia, Pride Inn Mara na Kananga camp.
                Gavana Ntutu alisema kuwa mto huo ulikuwa umefurika usiku wa manane na kuathiri sehemu za mji wa Talek na kuwaacha wageni wakiwa mekwama katika kambi kadhaa kando ya mto huo.
                Aidha, gavana huyo amesema kata ya Mosiro imeathiriwa sana na mvua zinazoendelea kunyesha huku familia 100 zinazoishi kando ya eneo la Mosiro zikihama makazi yao.
                Gavana huyo amewataka wale wanaoishi karibu na mito hiyo kuhama kwenda katika ardhi salama.
                Kamishna wa Kaunti ya Narok Lotiatia Kipkech alikariri maoni ya gavana huyo kwa kuwaonya wanaoishi karibu na mito kuhamia maeneo salama.
                Lotiatia amewataka wadau hao kuwatahadharisha wananchi wanaoishi karibu na mito juu ya hatari ya mafuriko, na kuongeza kuwa serikali itatumia nguvu kuwahamisha wananchi wanaoishi katika maeneo yanayokumbwa na mafuriko.         
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default A4Paper;
