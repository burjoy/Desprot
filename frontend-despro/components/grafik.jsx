import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { cobaSnapshot } from '../apis/getFirestore';
import { initializeApp } from 'firebase/app';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { Chart } from 'chart.js/auto';


function Graph() {
  const [chartData, setChartData] = useState({
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        label: 'Keramaian',
        data: [],
        // backgroundColor: ['#6df74a'],
      },
    ],
    options:{
      responsive: true
    }
  });

  // const [pastGraphs, setPastGraphs] = useState([]);

  // const previousDayRef = useRef(null);

  // const [hari_ini, setHariIni] = useState();
  // const [prevDay, setPrevDay] = useState();

  const [currentPop, setCurrentPop] = useState();
  const [currentDate, setCurrentDate] = useState();

  useEffect(() => {
    const app = initializeApp(cobaSnapshot());
    const db = getFirestore(app);
    const data = collection(db, "data_mac");
    onSnapshot(data, (snapshot) => {
      const waktu = [];
      const orang = [];
      snapshot.forEach((data_orang) => {
        const data = data_orang.data();

        const panjang = Object.keys(data).length;

        const keys = Object.keys(data);
  
        const sortedKeys = keys.sort();

        const current_data = data[sortedKeys[panjang-1]];

        current_data.forEach((buat_grafik) => {
          // console.log(buat_grafik)
          waktu.push(buat_grafik.jam);
          orang.push(buat_grafik.orang);
        })

        // console.log(waktu);
        // console.log(orang);

        setChartData({
          labels: waktu,
          datasets: [
            {
              label: 'Keramaian',
              data: orang,
              // backgroundColor: ['#6df74a'],
            },
          ],
          options:{
            responsive: true
          }
        })

        setCurrentPop(orang[orang.length-1]);
        setCurrentDate(keys[panjang-1]);
      })
    })
  }, []);

  return (
    <>
    <div className='max-md:h-screen max-md:flex max-md:flex-col max-md:justify-center'>
      <div className='flex justify-center mt-2 max-md:mt-0'>
        <div className="shadow-md rounded p-6 bg-white w-[80%] text-center max-md:w-[100%]">
          <h2 className="text-xl font-semibold mt-4">{`Tanggal Hari Ini: ${currentDate}`}</h2>
          <h2 className="text-xl font-semibold mt-4">{`Jumlah orang saat ini: ${currentPop}`}</h2>
          {/* <img className="rounded mx-auto" src="https://picsum.photos/200" alt="Image"></img> */}
          <Line data={chartData}/>
        </div>
      </div>
    </div>
      {/* {pastGraphs.map((pastGraph, index) => (
        <div key={index} className='flex justify-center mt-5'>
          <div className="shadow-md rounded p-6 bg-white w-[80%] text-center">
            <h2 className="text-xl font-semibold mt-4">Past Graph {index + 1}</h2>
            <img className="rounded mx-auto" src="https://picsum.photos/200" alt="Image"></img>
            <Line data={pastGraph} />
          </div>
        </div>
      ))} */}
    </>
  );
}

export { Graph };
