import React from "react";
import Home from "@components/HomePage.vue";
const HomePreview = ({ entry, getAsset, widgetFor, widgetsFor }) => {
  return (
    <Home
      cover={getAsset(entry.getIn(["data", "cover"])).toString()}
      carousel={widgetsFor("carousel")
        .map(c => ({ image: getAsset(c.getIn(["data", "image"])).toString() }))
        .toArray()}
      business={widgetsFor("business")
        .map(b => ({
          title: b.getIn(["data", "title"]),
          icon: b.getIn(["data", "icon"])
        }))
        .toJS()}
      sponsor={widgetsFor("sponsor")
        .map(s => ({
          title: s.getIn(["data", "title"]),
          image: getAsset(s.getIn(["data", "image"])).toString()
        }))
        .toJS()}
    />
  );
};
export default HomePreview;