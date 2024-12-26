import { GoArrowUpRight } from 'react-icons/go';
import { get_Album } from '../service/user.service';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Album = () => {
  const [lastAlbum, setlastAlbum] = useState()
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(false);




  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await get_Album();
        if (!data || data.length === 0) {
          setError(true);
        } else {
          setAlbums(data);


          setError(false); // Reset error if data is available
        }
      } catch (err) {
        console.log(err);
        setError(true); // Set error if request fails
      }
    };

    fetchAlbums();



  }, [])


  // useEffect(() => {
  //   if (albums.length > 0) {
  //     let obj = albums[albums.length - 1];
  //     console.log('obj',obj)
  //     setlastAlbum({ obj }); 
  //   }
  // }, [albums]); 




  return (
    <div className="w-full sm:h-[150vh] md:h-screen px-10 py-5 flex items-center justify-between sm:flex-col md:flex-row">
      <div className="md:w-[55vw] md:h-[62vh] sm:w-full sm:h-full grid  grid-rows-2 grid-cols-2  md:grid-cols-3 gap-[3vw]  md:gap-[1.5vw]  place-items-center">
        {error ? (
          <h1 className='text-2xl text-center'>No Data From Backend</h1>
        ) : albums.length === 0 ? (
          <h1 className='text-2xl text-center'>Album Not Found</h1>
        ) : (


          albums.map(item => (


            <Link to={`/album/${item.aName}`} className="sm:h-[230px] md:h-full w-full rounded-lg overflow-hidden relative m-[3vw] row-span-1" key={item.id}>
              <div className="h-full w-full bg-zinc-500 absolute top-0 left-0 bg-cover bg-center">
                <img
                  src={item.aImage_url}
                  alt={item.aName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex justify-center p-1.5 items-center rounded-full w-[2vw] h-[2vw] bg-black absolute z-40 right-1 top-1 my-2 mx-2">
                <GoArrowUpRight className="text-2xl text-white" />
              </div>
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-25 flex justify-between h-[25%] items-center px-1 w-full z-50">
                <p className="sm:text-sm md:text-base text-white">{item.aName}</p>
                {/* <p className="sm:text-sm md:text-base text-white">{item.aDescription}</p> */}
                <p className="sm:text-sm md:text-base text-white">{item.createdAt}</p>
              </div>

            </Link>




          ))
        )}


      </div>


      <div className='bg-red-600 h-[63vh] w-[35vw] mr-[1vw] md:mr-[2vw] rounded-lg relative'>

        {

          albums.filter(() => albums.length > 5).slice(-1).map((item) => {
            console.log('item', item)
            console.log('item', item.aName)

            return (


              <Link to={`/album/${item.aName}`} className="rounded-lg  " key={item.id}>

                

                <img srcSet={item.aImage_url} alt=""  className='w-full h-full object-cover rounded-lg object-center'/>

                <div className="flex justify-center p-1.5 items-center rounded-full w-[2vw] h-[2vw] bg-black absolute z-40 right-1 top-1 my-2 mx-2">
                <GoArrowUpRight className="text-2xl text-white" />
              </div>

                <div className="absolute bottom-0 right-0 bg-black bg-opacity-25 flex justify-between h-[25%] items-center px-1 w-full z-50  ">
                <p className="sm:text-sm md:text-base text-white">{item.aName}</p>
                {/* <p className="sm:text-sm md:text-base text-white">{item.aDescription}</p> */}
                <p className="sm:text-sm md:text-base text-white">{item.createdAt}</p>
                </div>

               

              </Link>


          

            )
          })

        }




      </div>
    </div>
  );
};

export default Album;