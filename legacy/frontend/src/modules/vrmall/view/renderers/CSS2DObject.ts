/**
 * @author mrdoob / http://mrdoob.com/
 */
import * as THREE from 'three';

export default class CSS2DObject extends THREE.Object3D {
  public element: HTMLElement;

  constructor(element: HTMLElement) {
    super();

    this.element = element;
    this.element.style.position = 'absolute';

    this.addEventListener('removed', () => {
      if (this.element.parentNode !== null) {
        this.element.parentNode.removeChild(this.element);
      }
    });
  }
}
