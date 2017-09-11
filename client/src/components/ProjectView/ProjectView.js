import React, { Component } from 'react';
import { alphabeticalSort } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

import styles from './style.pcss';

import ProjectBox from './ProjectBox';

export default class ProjectView extends Component {
  render() {
    const {
      employees,
      projects,
      entries,
      date,
      setProjectStatus,
      setProjectDescription,
    } = this.props;

    const projectsWithEmployeesFirst = projects
      .sort((a, b) => alphabeticalSort(a.name, b.name))
      .map(p => {
        p.employees = employees.filter(e => e.projects).filter(e => e.projects.includes(p.id));
        return p;
      });

    return (
      <div>
        <div className={styles.projectsWrapper}>
          <div className={styles.cardContainer}>
            {projectsWithEmployeesFirst.map(p => {
              if (p.employees.size > 0) {
                return (
                  <ProjectBox
                    key={p.id}
                    project={p}
                    entries={entries}
                    saveStatus={status => setProjectStatus(p, status)}
                    saveDescription={desc => setProjectDescription(p, desc)}
                  />
                );
              }
            })};
          </div>

          <h4 className={styles.title}>
            <FormattedMessage
              id="projects_projectsWithout"
              defaultMessage="Projects without anyone assigned"
            />
          </h4>

          <div className={styles.cardContainer}>
            {projectsWithEmployeesFirst.map(p => {
              if (p.employees.size < 1) {
                return (
                  <ProjectBox
                    key={p.id}
                    project={p}
                    entries={entries}
                    saveStatus={status => setProjectStatus(p, status)}
                    saveDescription={desc => setProjectDescription(p, desc)}
                  />
                );
              }
            })};
          </div>
        </div>
      </div>
    );
  }
}
