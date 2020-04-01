import React, { Children, cloneElement } from "react";
import { ReactTableDefaults } from "./react-table";
import { List, AutoSizer } from "react-virtualized";

const elementIsGroup = element =>
  element.type === ReactTableDefaults.TrGroupComponent;

const flattenGroups = groups =>
  groups
    .map(group => {
      const children = Children.toArray(group.props.children);
      const embeddedGroups = children.filter(elementIsGroup);
      const rows = children.filter(element => !elementIsGroup(element));

      return [
        cloneElement(group, { children: rows }),
        ...flattenGroups(embeddedGroups)
      ];
    })
    .reduce((result, chunk) => result.concat(chunk), []);

const TbodyComponent = props => {
  const { children, ...restProps } = props;
  const rows = flattenGroups(Children.toArray(children));
  const rowRenderer = ({ key, index, style }) => {
    return (
      <div key={key} style={style}>
        {rows[index]}
      </div>
    );
  };

  return (
    <ReactTableDefaults.TbodyComponent {...restProps}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={rows.length}
            rowHeight={30}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </ReactTableDefaults.TbodyComponent>
  );
};

export default Component => {
  return class RTSlowVirtualizedTable extends React.Component {
    render() {
      return <Component TbodyComponent={TbodyComponent} {...this.props} />;
    }
  };
};
