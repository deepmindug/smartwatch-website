import { proofLine } from '../../data/content'
import { cx } from '../../lib/cx'
import SmartLink from '../SmartLink'
import s from './Sections.module.css'

export default function ProofStrip() {
  return (
    <div className={cx('container', s.proof)}>
      <span>{proofLine.text}</span>{' '}
      <SmartLink to={proofLine.to} className="link-arrow link-arrow--sm">
        {proofLine.linkLabel}
      </SmartLink>
    </div>
  )
}
