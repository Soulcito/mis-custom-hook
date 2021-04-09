import { useEffect, useRef, useState } from "react"

export const useFetch = ( url ) => {
    
    const [state, setState] = useState({ data: null, loading: true, error: null});
    
    //Es importante este useRef para prevenir fugas de memoria cuando se desmonta el componente por un problema no controlado.
    const isMounted = useRef(true);
    
    useEffect(() => {     
       return () => {
          isMounted.current = false;
       } 
    },[]);

    useEffect(() => {
        
         setState({ data: null, loading: true, error: null});

         fetch(url)
            .then( resp => resp.json())
            .then( data => {

                 if( isMounted.current ){
                        setState({
                          loading: false,
                          error: null,
                          data
                       });                        
                 }                  
            })
            .catch(() => {
               setState({
                  data: null,
                  loading: false,
                  error: 'No se pudo cargar la info'
               });
            });

    }, [url]);

    return state;

}
