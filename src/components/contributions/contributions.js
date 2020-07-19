import React from "react";

import "./contributions.scss";

class ContributionPage extends React.Component {
    desktop() {
        return (
            <div style={{width: 'fit-content', margin: '0 auto', marginTop: "64px", overflowY: "auto", height: "calc(100vh - 64px)"}}>
                <br/>
                <span className="contributions-body-title-header">
                    Contributions
                </span>
                <br/>
                <br/>
                <br/>
                <div style={{marginLeft: "40px"}}>
                    <span className="contributions-body"> You can also contribute to our model-zoo, please follow these instructions: </span>
                    <br/>
                    <br/>

                    <span className="contributions-body" style={{justify: "left"}}>
                        <li style={{maxWidth: "600px", wordWrap: "break-word"}}>
                        All models should be self-contained in a folder inside the repo when you make a PR.
                        </li>
                        <br/>

                    </span>
                    <span className="contributions-body" style={{justify: "left"}}>
                         <li style={{maxWidth: "600px", wordWrap: "break-word"}}>
                        The PR must contain an jupyter notebook converted to html
                        showing how to use the models, if you want, you can show usage using the forest_utils
                        to load models.
                        </li>
                        <br/>

                        </span>
                    <span className="contributions-body" style={{justify: "left"}}>
                        <li style={{maxWidth: "600px", wordWrap: "break-word"}}>
                        A preprocessing notebook as html can also be added, but it's utility can also be shown
                        inside the aforementioned usage file.
                        </li>
                        <br/>
                    </span>
                    <span className="contributions-body" style={{justify: "left"}}>
                        <li style={{maxWidth: "600px", wordWrap: "break-word"}}>
                        The PR must also contain a json file, containing the
                        following information as types mentioned, for example
                        </li>
                        <br/>

                    </span>

                    <span className="contributions-body" style={{justify: "left"}}>
                        <li style={{maxWidth: "600px", wordWrap: "break-word"}}>
                        The PR must also contain a json file, containing the
                        following information as types mentioned, for example
                        </li>
                        <br/>

                    </span>
                </div>
                <div style={{marginLeft: "40px", marginTop: "20px", width: "600px", height: "300px", overflow: "auto"}}>
                <pre><code className="lang-json">{"{"}<br/>
                    <span
                        className="hljs-string">"Title"</span>: <span
                        class="hljs-string">"Heartbeat Classification"</span>, (<span class="hljs-name">Title</span> of the model (<span
                        class="hljs-name">type:str</span>))
                    <br/><span class="hljs-string">"Tags"</span>: [<span class="hljs-string">"Sequence Task"</span>,<span
                        class="hljs-string">"Disease Classification"</span>], (<span class="hljs-name">ML</span> tags you want to add it to (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">str</span></span>)), must be one of the tags already created, check forest website to see available tags)
                    <br/><span class="hljs-string">"Architecture"</span>: <span class="hljs-string">"CNN-1D"</span>, (<span
                        class="hljs-name">Architecture</span> of the model followed, (<span
                        class="hljs-name">type:str</span>))
                   <br/><span class="hljs-string">"Publisher"</span>: [[<span
                        class="hljs-string">"Tanmay Thakur"</span>,<span
                        class="hljs-string">"https://github.com/lordtt13"</span>], [<span
                        class="hljs-string">"Smoketrees"</span>,<span
                        class="hljs-string">"https://github.com/smoke-trees"</span>]], (<span
                        class="hljs-name">The</span> people and/or organisations involved in the commit (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">list</span></span>)) list elements are lists containing two elements, one being the name to be shown, the other a link to the profile or null)
                    <br/><span class="hljs-string">"Problem Domain"</span>: <span
                        class="hljs-string">"Sequence"</span>, (<span class="hljs-name">ML</span> problem domains you want to add it to (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">str</span></span>)), must be one of the domains already created, check forest website to see available domains)
                    <br/><span class="hljs-string">"Model Format"</span>: <span
                        class="hljs-string">"Tensorflow2"</span>, (<span class="hljs-name">Mention</span> what framework was used in making the model (<span
                        class="hljs-name">type:str</span>))
                    <br/><span class="hljs-string">"Language"</span>: <span class="hljs-string">"null"</span>, (<span
                        class="hljs-name">If</span> an NLP model, what language does the model take into consideration (<span
                        class="hljs-name">type:str</span>))
                    <br/><span class="hljs-string">"Dataset"</span>: [[<span class="hljs-string">"MIT-BIH"</span>,<span
                        class="hljs-string">"https://physionet.org/content/mitdb/1.0.0/"</span>]], (<span
                        class="hljs-name">The</span> dataset the model was trained on (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">list</span></span>)) list elements are lists containing two elements, one being the name to be shown, the other a link to the dataset or null)
                    <br/><span class="hljs-string">"Overview"</span>: <span class="hljs-string">"A classification task done on the MIT-BIH dataset, split into 5 labels."</span>, (<span
                        class="hljs-name">A</span> simple discription of your model (<span
                        class="hljs-name">type:str</span>))
                    <br/><span class="hljs-string">"Preprocessing"</span>: <span class="hljs-string">"null"</span>, (<span
                        class="hljs-name">Path</span> to the preprocessing.html file (<span
                        class="hljs-name">type:str</span>))
                   <br/> <span class="hljs-string">"Link"</span>: <span
                        class="hljs-string">"https://drive.google.com/file/d/1H5pB5kYTmga7xsytxGVAH07KPK00tHwJ/view?usp=sharing"</span>, (<span
                        class="hljs-name">Link</span> where your model is saved (<span class="hljs-name">type:str</span>), save it in your own google drives with permissions for everyone to view)
                    <br/><span class="hljs-string">"Usage"</span>: <span class="hljs-string">"usage.html"</span>, (<span
                        class="hljs-name">Path</span> to the usage.html file (<span class="hljs-name">type:str</span>))
                    <br/><span class="hljs-string">"References"</span>: <span
                        class="hljs-string">"[http://ecg.mit.edu/george/publications/mitdb-embs-2001.pdf]"</span>, (<span
                        class="hljs-name">Links</span> to any research papers you followed or want to reference (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">str</span></span>)))
                    <br/><span class="hljs-string">"Input Shape"</span>: <span
                        class="hljs-string">"[[1,187,1]]"</span>, (<span class="hljs-name">Input</span> shapes of the model (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">list</span></span>)))
                    <br/><span class="hljs-string">"Output Shape"</span>: <span class="hljs-string">"[[1,5]]"</span> (<span
                        class="hljs-name">Output</span> shapes of the model (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">list</span></span>)))
                    <br/>{"}"}
                    </code></pre>
                </div>
            </div>
        )
    }

    mobile() {
        return (
            <div style={{marginTop: "64px", marginLeft: "30px", overflowY: "auto", height: "calc(100vh - 64px)"}}>
                <br/>
                <span className="contributions-body-title-header">
                    Contributions
                </span>
                <br/>
                <br/>
                <br/>
                <div style={{marginLeft: "10px", maxWidth: "calc(100vw - 60px)"}}>
                    <span className="contributions-body"> You can also contribute to our model-zoo, please follow these instructions: </span>
                    <br/>
                    <br/>

                    <span className="contributions-body" style={{justify: "left"}}>
                        <li style={{maxWidth: "calc(100vw - 60px)", wordWrap: "break-word"}}>
                        All models should be self-contained in a folder inside the repo when you make a PR.
                        </li>
                        <br/>

                    </span>
                    <span className="contributions-body" style={{justify: "left"}}>
                         <li style={{maxWidth: "calc(100vw - 60px)", wordWrap: "break-word"}}>
                        The PR must contain an jupyter notebook converted to html
                        showing how to use the models, if you want, you can show usage using the forest_utils
                        to load models.
                        </li>
                        <br/>

                        </span>
                    <span className="contributions-body" style={{justify: "left"}}>
                        <li style={{maxWidth: "calc(100vw - 60px)", wordWrap: "break-word"}}>
                        A preprocessing notebook as html can also be added, but it's utility can also be shown
                        inside the aforementioned usage file.
                        </li>
                        <br/>
                    </span>
                    <span className="contributions-body" style={{justify: "left"}}>
                        <li style={{maxWidth: "calc(100vw - 60px)", wordWrap: "break-word"}}>
                        The PR must also contain a json file, containing the
                        following information as types mentioned, for example
                        </li>
                        <br/>

                    </span>

                    <span className="contributions-body" style={{justify: "left"}}>
                        <li style={{maxWidth: "calc(100vw - 60px)", wordWrap: "break-word"}}>
                        The PR must also contain a json file, containing the
                        following information as types mentioned, for example
                        </li>
                        <br/>

                    </span>
                </div>
                <div style={{marginLeft: "10px", marginTop: "20px", width: "calc(100vw - 60px)", height: "300px", overflow: "auto"}}>
                <pre><code className="lang-json">{"{"}<br/>
                    <span
                        className="hljs-string">"Title"</span>: <span
                        class="hljs-string">"Heartbeat Classification"</span>, (<span class="hljs-name">Title</span> of the model (<span
                        class="hljs-name">type:str</span>))
                    <br/><span class="hljs-string">"Tags"</span>: [<span class="hljs-string">"Sequence Task"</span>,<span
                        class="hljs-string">"Disease Classification"</span>], (<span class="hljs-name">ML</span> tags you want to add it to (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">str</span></span>)), must be one of the tags already created, check forest website to see available tags)
                    <br/><span class="hljs-string">"Architecture"</span>: <span class="hljs-string">"CNN-1D"</span>, (<span
                        class="hljs-name">Architecture</span> of the model followed, (<span
                        class="hljs-name">type:str</span>))
                   <br/><span class="hljs-string">"Publisher"</span>: [[<span
                        class="hljs-string">"Tanmay Thakur"</span>,<span
                        class="hljs-string">"https://github.com/lordtt13"</span>], [<span
                        class="hljs-string">"Smoketrees"</span>,<span
                        class="hljs-string">"https://github.com/smoke-trees"</span>]], (<span
                        class="hljs-name">The</span> people and/or organisations involved in the commit (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">list</span></span>)) list elements are lists containing two elements, one being the name to be shown, the other a link to the profile or null)
                    <br/><span class="hljs-string">"Problem Domain"</span>: <span
                        class="hljs-string">"Sequence"</span>, (<span class="hljs-name">ML</span> problem domains you want to add it to (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">str</span></span>)), must be one of the domains already created, check forest website to see available domains)
                    <br/><span class="hljs-string">"Model Format"</span>: <span
                        class="hljs-string">"Tensorflow2"</span>, (<span class="hljs-name">Mention</span> what framework was used in making the model (<span
                        class="hljs-name">type:str</span>))
                    <br/><span class="hljs-string">"Language"</span>: <span class="hljs-string">"null"</span>, (<span
                        class="hljs-name">If</span> an NLP model, what language does the model take into consideration (<span
                        class="hljs-name">type:str</span>))
                    <br/><span class="hljs-string">"Dataset"</span>: [[<span class="hljs-string">"MIT-BIH"</span>,<span
                        class="hljs-string">"https://physionet.org/content/mitdb/1.0.0/"</span>]], (<span
                        class="hljs-name">The</span> dataset the model was trained on (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">list</span></span>)) list elements are lists containing two elements, one being the name to be shown, the other a link to the dataset or null)
                    <br/><span class="hljs-string">"Overview"</span>: <span class="hljs-string">"A classification task done on the MIT-BIH dataset, split into 5 labels."</span>, (<span
                        class="hljs-name">A</span> simple discription of your model (<span
                        class="hljs-name">type:str</span>))
                    <br/><span class="hljs-string">"Preprocessing"</span>: <span class="hljs-string">"null"</span>, (<span
                        class="hljs-name">Path</span> to the preprocessing.html file (<span
                        class="hljs-name">type:str</span>))
                   <br/> <span class="hljs-string">"Link"</span>: <span
                        class="hljs-string">"https://drive.google.com/file/d/1H5pB5kYTmga7xsytxGVAH07KPK00tHwJ/view?usp=sharing"</span>, (<span
                        class="hljs-name">Link</span> where your model is saved (<span class="hljs-name">type:str</span>), save it in your own google drives with permissions for everyone to view)
                    <br/><span class="hljs-string">"Usage"</span>: <span class="hljs-string">"usage.html"</span>, (<span
                        class="hljs-name">Path</span> to the usage.html file (<span class="hljs-name">type:str</span>))
                    <br/><span class="hljs-string">"References"</span>: <span
                        class="hljs-string">"[http://ecg.mit.edu/george/publications/mitdb-embs-2001.pdf]"</span>, (<span
                        class="hljs-name">Links</span> to any research papers you followed or want to reference (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">str</span></span>)))
                    <br/><span class="hljs-string">"Input Shape"</span>: <span
                        class="hljs-string">"[[1,187,1]]"</span>, (<span class="hljs-name">Input</span> shapes of the model (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">list</span></span>)))
                    <br/><span class="hljs-string">"Output Shape"</span>: <span class="hljs-string">"[[1,5]]"</span> (<span
                        class="hljs-name">Output</span> shapes of the model (<span
                        class="hljs-name">type:list</span>(<span class="hljs-name"><span
                        class="hljs-builtin-name">list</span></span>)))
                    <br/>{"}"}
                    </code></pre>
                </div>
            </div>
        )
    }

    render() {
        if (this.props.isDesktop) {
            return this.desktop()
        } else {
            return this.mobile()
        }
    }
}

export default ContributionPage;