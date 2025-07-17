import { Libraries, Loader } from '@googlemaps/js-api-loader';
import { useEffect, useState } from 'react';

let loaderInstance: Loader | null = null;
let loaderPromise: Promise<typeof google> | null = null;

const GOOGLE_MAP_LIBRARIES: Libraries = ['geometry'];

const useGoogleMapsLoader = (apiKey: string) => {
    const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (!apiKey) return;

        if (!loaderInstance) {
            loaderInstance = new Loader({
                apiKey,
                libraries: GOOGLE_MAP_LIBRARIES
            });
        }

        if (!loaderPromise) {
            loaderPromise = loaderInstance.load();
        }

        let isMounted = true;

        loaderPromise
            .then(() => {
                if (isMounted) {
                    setIsGoogleMapsLoaded(true);
                }
            })
            .catch(err => {
                if (isMounted) {
                    setError(err);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [apiKey]);

    return { isGoogleMapsLoaded, error };
};

export default useGoogleMapsLoader;