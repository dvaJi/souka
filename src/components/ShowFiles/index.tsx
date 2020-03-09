import * as React from 'react';
import Dropzone from 'react-dropzone';
import { History } from 'history';

import { CloudOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Row, Col, Button, Card, Typography } from 'antd';

import { FilesState } from '../../types/States';

interface Props {
  init: (keys: string[]) => void;
  select: (filename: string) => void;
  add: (file: File) => void;
  addAll: (files: File[]) => void;
  remove: (file: File | any) => void;
  removeAll: () => void;
  files: FilesState;
  history: History;
}

class ShowFiles extends React.Component<Props> {
  onDrop = (files: File[]) => {
    const { addAll } = this.props;
    const filesFormatted = files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        filename: file.name
      })
    );
    addAll(filesFormatted);
  };

  selectFile = async () => {
    const { select, init, files, history } = this.props;
    await init(files.keys);
    await select(files.keys[0]);
    history.push('/translate');
  };

  handleOnRemove = (file: File | any) => () => {
    const { remove } = this.props;
    remove(file);
  };

  render() {
    const { removeAll, files } = this.props;
    const hasFiles = files.keys.length > 0;
    return (
      <Row>
        <Col span={24}>
          <Row>
            <Col span={6} offset={18}>
              <Button icon={<EditOutlined />} onClick={this.selectFile} disabled={!hasFiles}>
                Translate
              </Button>
              <Button
                icon={<DeleteOutlined />}
                type="danger"
                onClick={removeAll}
                disabled={!hasFiles}
              >
                Remove All
              </Button>
            </Col>
          </Row>
          <Row>
            <Dropzone accept="image/*" onDrop={this.onDrop}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                  style={{ margin: '0 auto', width: '100%', minHeight: '80vh', outlineWidth: 0 }}
                  {...getRootProps()}
                >
                  <input
                    {...getInputProps({
                      onClick: evt => evt.preventDefault()
                    })}
                  />
                  <div
                    style={{
                      display: !hasFiles || isDragActive ? 'initial' : 'none',
                      padding: '10px 100px',
                      position: 'fixed',
                      top: '60%',
                      left: '35%',
                      zIndex: 99
                    }}
                  >
                    <Typography.Title level={4}>
                      <CloudOutlined /> Drop your files here
                    </Typography.Title>
                  </div>
                  <Col span={24}>
                    {hasFiles &&
                      files.keys.map((key: string) => (
                        <Card
                          key={files.files[key].name}
                          hoverable
                          style={{ width: 240, marginRight: 15 }}
                          cover={
                            <div
                              style={{
                                backgroundImage: `url(${files.files[key].preview})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                width: '100%',
                                height: 200
                              }}
                            />
                          }
                          actions={[
                            <DeleteOutlined
                              key="delete"
                              onClick={this.handleOnRemove(files.files[key])}
                            />
                          ]}
                        >
                          <Card.Meta
                            title={files.files[key].name}
                            description={<span>by: {files.files[key].size}</span>}
                          />
                        </Card>
                      ))}
                  </Col>
                </div>
              )}
            </Dropzone>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default ShowFiles;
