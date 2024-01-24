"use client"

import { useEffect, useRef } from "react"

let adDisplayContainer
let adsLoader
let adsManager

export function MyComponent() {
  const adContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!adContainerRef.current) return

    adDisplayContainer = new google.ima.AdDisplayContainer(adContainerRef.current)
    adsLoader = new google.ima.AdsLoader(adDisplayContainer)

    let adsRequest = new google.ima.AdsRequest()
    adsRequest.adTagUrl =
      "https://pubads.g.doubleclick.net/gampad/ads?" +
      "iu=/21775744923/external/single_ad_samples&sz=640x480&" +
      "cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&" +
      "gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
    // Pass the request to the adsLoader to request ads
    adsLoader.requestAds(adsRequest)

    adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      (adsManagerLoadedEvent) => {
        console.log(
          "🐛 XXX ~ adsLoader.addEventListener ~ e:",
          adsManagerLoadedEvent,
          adsManagerLoadedEvent.getAdsManager()
        )
        adsManager = adsManagerLoadedEvent.getAdsManager(videoRef.current)
        console.log("🐛 XXX ~ useEffect ~ adsManager:", adsManager)
      },
      false
    )

    adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      () => {
        console.log("🐛 XXX ~ adsLoader.addEventListener ~ e:", e)
      },
      false
    )
  }, [])

  const playAds = () => {
    adDisplayContainer.initialize()
    try {
      // Initialize the ads manager. Ad rules playlist will start at this time.
      adsManager.init(640, 360, google.ima.ViewMode.NORMAL)
      // Call play to start showing the ad. Single video and overlay ads will
      // start at this time; the call will be ignored for ad rules.
      adsManager.start()
    } catch (adError) {
      // An error may be thrown if there was a problem with the VAST response.
      console.log("🐛 XXX ~ playAds ~ adError:", adError)
    }
  }

  return (
    <div className="w-[90vw] h-[90vh]" ref={adContainerRef} id="ads-container">
      <video ref={videoRef} id="video" className="w-[640px] h-[360px]">
        {/* <source src="https://storage.googleapis.com/gvabox/media/samples/stock.mp4"></source> */}
      </video>
      <button onClick={playAds}>Play Ads</button>
    </div>
  )
}
