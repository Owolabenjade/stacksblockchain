(define-map polls
  { poll-id: uint }
  {
    creator: principal,
    options: (list 20 { option-name: (string-ascii 20), votes: uint }),
    total-votes: uint
  }
)

(define-public (create-poll (poll-id uint) (options (list 20 (string-ascii 20))))
  (begin
    (asserts! (is-none (map-get? polls { poll-id: poll-id })) (err u1))
    (ok (map-set polls
        { poll-id: poll-id }
        {
          creator: tx-sender,
          options: (map create-option options),
          total-votes: u0
        }
    ))
  )
)

(define-private (create-option (option-name (string-ascii 20)))
  { option-name: option-name, votes: u0 }
)

(define-public (vote (poll-id uint) (option-name (string-ascii 20)))
  (match (map-get? polls { poll-id: poll-id })
    poll (match (find-option option-name (get options poll))
      option (let ((new-votes (+ (get votes option) u1)))
        (ok (map-set polls 
          { poll-id: poll-id }
          (merge poll 
            {
              options: (update-option option-name new-votes (get options poll)),
              total-votes: (+ u1 (get total-votes poll))
            }))))
      (err u3))
    (err u2))
)

(define-read-only (get-results (poll-id uint))
  (match (map-get? polls { poll-id: poll-id })
    poll (ok (get options poll))
    (err u4))
)

(define-private (find-option (option-name (string-ascii 20)) (options (list 20 { option-name: (string-ascii 20), votes: uint })))
  (find (lambda (option) (is-eq (get option-name option) option-name)) options)
)

(define-private (update-option (option-name (string-ascii 20)) (new-votes uint) (options (list 20 { option-name: (string-ascii 20), votes: uint })))
  (map (lambda (option)
    (if (is-eq (get option-name option) option-name)
      (merge option { votes: new-votes })
      option
    )) options)
)