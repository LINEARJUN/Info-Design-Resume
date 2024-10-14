import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import ApexCharts from 'react-apexcharts';
import gsap from 'gsap';
import { animateWithGsap } from '../utils/animations';

const Features = () => {
  const [chartData, setChartData] = useState([]);

  // Load and parse the CSV data
  useEffect(() => {
    Papa.parse('/datasets/spotify.csv', {
      download: true,
      header: true,
      complete: (result) => {
        setChartData(result.data);
      }
    });
  }, []);

  useEffect(() => {
    animateWithGsap('.g_text', { y: 0, opacity: 1, ease: 'power2.inOut', duration: 1 });
  }, []);

  // Data for multiple aspects (streams, bpm, and valence)
  const getTopTracksData = () => {
    return chartData.slice(0, 10).map(track => ({
      name: track.track_name,
      streams: parseInt(track.streams, 10),
      bpm: parseInt(track.bpm, 10),
      valence: parseInt(track.valence, 10),
      energy: parseInt(track.energy, 10)
    }));
  };

  const topTracks = getTopTracksData();

  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false  // 상단 메뉴를 숨깁니다.
      },
      zoom: {
        enabled: false  // 마우스 휠을 통한 줌 비활성화
      },
      pan: {
        enabled: false  // 마우스를 드래그하여 차트를 이동하는 기능 비활성화
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: topTracks.map(track => track.name),
    },
    yaxis: {
      title: {
        text: 'Streams & Energy'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        color: '#000',
      },
      y: {
        formatter: function (val) {
          return val;
        }
      },
      marker: {
        show: true,
        fillColors: ['#8884d8', '#82ca9d']
      },
      background: {
        enabled: true,
        foreColor: '#000',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        dropShadow: {
          enabled: true,
          top: 2,
          left: 2,
          blur: 5,
          color: '#000',
          opacity: 0.2
        }
      }
    }
  };
  
  const lineChartOptions = {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false  // 상단 메뉴를 숨깁니다.
      },
      zoom: {
        enabled: false  // 마우스 휠을 통한 줌 비활성화
      },
      pan: {
        enabled: false  // 마우스를 드래그하여 차트를 이동하는 기능 비활성화
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: topTracks.map(track => track.name),
    },
    yaxis: {
      title: {
        text: 'Streams & BPM'
      }
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        color: '#000',
      },
      y: {
        formatter: function (val) {
          return val;
        }
      },
      marker: {
        show: true,
        fillColors: ['#ff7300', '#387908']
      },
      background: {
        enabled: true,
        foreColor: '#000',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        dropShadow: {
          enabled: true,
          top: 2,
          left: 2,
          blur: 5,
          color: '#000',
          opacity: 0.2
        }
      }
    }
  };
  
  const areaChartOptions = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false  // 상단 메뉴를 숨깁니다.
      },
      zoom: {
        enabled: false  // 마우스 휠을 통한 줌 비활성화
      },
      pan: {
        enabled: false  // 마우스를 드래그하여 차트를 이동하는 기능 비활성화
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: topTracks.map(track => track.name),
    },
    yaxis: {
      title: {
        text: 'BPM & Valence'
      }
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
        color: '#000',
      },
      y: {
        formatter: function (val) {
          return val;
        }
      },
      marker: {
        show: true,
        fillColors: ['#8884d8', '#82ca9d']
      },
      background: {
        enabled: true,
        foreColor: '#000',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        dropShadow: {
          enabled: true,
          top: 2,
          left: 2,
          blur: 5,
          color: '#000',
          opacity: 0.2
        }
      }
    }
  };
  
  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mb-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">simple.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">graph showcase.</h2>
          </div>

          <div className="flex-center flex-col sm:px-10">
            <div id="chartSection" className="flex flex-col w-full relative">
              <div className="feature-video-container flex justify-between">

                {/* 첫 번째 차트: 스트림 및 에너지 */}
                <div className="chart-container" style={{ width: '30%', height: '350px' }}>
                  <ApexCharts
                    options={barChartOptions}
                    series={[
                      { name: 'Streams', data: topTracks.map(track => track.streams) },
                      { name: 'Energy', data: topTracks.map(track => track.energy) }
                    ]}
                    type="bar"
                    height={350}
                  />
                </div>

                {/* 두 번째 차트: 스트림 및 BPM */}
                <div className="chart-container" style={{ width: '30%', height: '350px' }}>
                  <ApexCharts
                    options={lineChartOptions}
                    series={[
                      { name: 'Streams', data: topTracks.map(track => track.streams) },
                      { name: 'BPM', data: topTracks.map(track => track.bpm) }
                    ]}
                    type="line"
                    height={350}
                  />
                </div>

                {/* 세 번째 차트: BPM 및 감정 상태 (Valence) */}
                <div className="chart-container" style={{ width: '30%', height: '350px' }}>
                  <ApexCharts
                    options={areaChartOptions}
                    series={[
                      { name: 'BPM', data: topTracks.map(track => track.bpm) },
                      { name: 'Valence', data: topTracks.map(track => track.valence) }
                    ]}
                    type="area"
                    height={350}
                  />
                </div>
              </div>

              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Customized interactive charts using {' '}
                    <span className="text-white">
                    ApexCharts within a React environment {' '}
                    </span>
                    to display complex data in a visually appealing way.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Overall, the goal was to balance aesthetics with usability, {' '}
                    <span className="text-white">
                    ensuring that the data was both clear and engaging {' '}
                    </span>
                    while eliminating distracting or non-essential interactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
