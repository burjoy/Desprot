import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { cobaSnapshot } from '../apis/getFirestore';
import { initializeApp } from 'firebase/app';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { Dropdown } from 'flowbite-react';
import { Chart } from 'chart.js/auto';


function PastGraph() {
  const [tanggal, setTanggal] = useState([]);
  const [pilihan, setPilihan] = useState("Pilih Tanggal");
  const [chartData, setChartData] = useState({
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        label: 'Keramaian',
        data: [],
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

  const [currentDate, setCurrentDate] = useState("1970-01-01");

  const ambil_data = async(day) => {
    setPilihan(day);
    const app = initializeApp(cobaSnapshot());
    const db = getFirestore(app);
    try {
        const querySnapshot = await getDocs(collection(db, "data_mac"));
        const waktu = [];
        const orang = [];
        querySnapshot.forEach((doc) => {
        //   console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
          const data = doc.data();
        //   const keys = Object.keys(data);
        //   console.log(keys);
          const data_sekarang = data[day];
          data_sekarang.forEach((individu) => {
            waktu.push(individu.jam);
            orang.push(individu.orang);
          })
        //   console.log(waktu);
        //   console.log(orang);
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
  
        //   setCurrentPop(orang[orang.length-1]);
          setCurrentDate(day);
        });   
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    const app = initializeApp(cobaSnapshot());
    const db = getFirestore(app);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "data_mac"));
            querySnapshot.forEach((doc) => {
            //   console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
              const data = doc.data();
              const keys = Object.keys(data);
            //   console.log(keys);
    
              const sortedKeys = keys.sort();
    
            //   console.log(sortedKeys);
              setTanggal(sortedKeys);
            }
            );   
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
  }, []);

  return (
    <>
    <div className='max-md:h-screen max-md:flex max-md:flex-col max-md:justify-center'>
      <div className='flex justify-center mt-2 max-md:mt-0'>
        <div className="shadow-md rounded p-6 bg-white w-[80%] text-center max-md:w-[100%]">
          <h2 className="text-xl font-semibold mt-4">{`Tanggal dipilih: ${currentDate}`}</h2>
          {/* <img className="rounded mx-auto" src="https://picsum.photos/200" alt="Image"></img> */}
          <Line data={chartData}/>
        </div>
      </div>

    <div className='flex justify-center mt-4'>
      <Dropdown label={pilihan} dismissOnClick={true} className='mx-auto' placement='top'>
        {tanggal?.map((hari, index) => (
          <Dropdown.Item key={index} onClick={() => ambil_data(hari)}>{hari}</Dropdown.Item>
        ))}
      </Dropdown>
    </div>
    </div>
    {/* {tanggal?.map((hari, index) => (
          <h2 key={index}>{hari}</h2>
        ))} */}
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

export { PastGraph };
