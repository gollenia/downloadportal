import { ScrollRestoration, useParams } from 'react-router-dom';
import Error from '../components/Error';
import Navigation from '../components/navigation/Navigation';
import { Article } from '../services/models/article';
import Parser from '../services/parser';
import useFetch from '../services/useFetch';
import useUrl, { useMediaUrl } from '../services/useUrl';

const ArticlePage = () => {
    const { '*': id } = useParams();

    const args = {
        controller: 'page',
        id: id ? id : 'start',
    };

    const headerUrl = useUrl({
        controller: 'page',
        id: 'system:header',
    });

    const url = useUrl(args);
    const { data, error } = useFetch<Article>(url);
    const header = useFetch<Article>(headerUrl);

    console.log('headser', header);

    const fileList = () => {
        if (!data?.files) return [];
        return data.files.filter(file => file.extension !== 'jpg' && file.extension !== 'jpeg');
    };

    const availableFiles = fileList();
    console.log(data);

    const hasFiles = availableFiles.length > 0;
    const sideInfo = data?.showSubpages || hasFiles;
    const countFiles = availableFiles.length;

    const imageSrc: string = useMediaUrl(data?.pageimage, 1440);

    return (
        <div>
            <Navigation />
            <ScrollRestoration />

            <header className="header" style={{ backgroundColor: '#e7caac' }}>
                <div className="header__content align-self-end">
                    {header.data && <Parser content={header.data?.content} />}
                </div>

                {data?.pageimage && <img src={imageSrc} style={{ objectPosition: 'right' }} />}
            </header>

            <div className="py-12">
                {error && <Error message="No connection to server" />}
                {!data && <div className="loader"></div>}
                {data && (
                    <div className="">
                        <div className="">
                            <div className={''}>
                                <Parser content={data?.content} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticlePage;
